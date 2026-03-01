import type {
  IBite,
  IBlog,
  IPost,
  IPosts,
  IProject,
  IReview,
} from "@/types/Post";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";
type CloudflareAssetBinding = { fetch: typeof fetch };
type AssetRequest = Request & {
  cloudflare?: { env?: { ASSETS?: CloudflareAssetBinding } };
};

function filterDrafts<T extends { draft?: boolean }>(items: T[]): T[] {
  return isProd ? items.filter((item) => !item.draft) : items;
}

// Exposes the request origin so server functions can fetch static assets
// via HTTP — required for Cloudflare Workers (no fs access).
// In local dev the origin is http://localhost:3000, Vite serves public/ there.
const requestMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    return next({ context: { origin: new URL(request.url).origin, request } });
  }
);

async function fetchAssetJson<T>(
  request: Request,
  origin: string,
  path: string
): Promise<T> {
  const req = request as AssetRequest;
  const assetFetcher = req.cloudflare?.env?.ASSETS?.fetch;
  const assetRequest = new Request(new URL(path, origin).toString(), {
    method: "GET",
    headers: { accept: "application/json" },
  });

  // Prefer ASSETS binding in production to avoid self-fetch loops.
  const res = assetFetcher
    ? await assetFetcher(assetRequest)
    : await fetch(assetRequest);
  if (!res.ok) throw new Error(`Failed to fetch asset ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

async function loadPostsIndex(
  request: Request,
  origin: string
): Promise<IPosts> {
  return fetchAssetJson<IPosts>(request, origin, "/compiled-posts/index.json");
}

export const getMiniPosts = createServerFn({ method: "GET" })
  .middleware([requestMiddleware])
  .handler(async ({ context }): Promise<IPosts> => {
    try {
      const posts = await loadPostsIndex(context.request, context.origin);

      posts.blogs = filterDrafts(posts.blogs);
      posts.projects = filterDrafts(posts.projects);
      posts.reviews = filterDrafts(posts.reviews);

      return posts;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          projects: [],
          blogs: [],
          reviews: [],
          bites: [],
        };
      }

      console.warn("Failed to load posts index:", error);
      return {
        projects: [],
        blogs: [],
        reviews: [],
        bites: [],
      };
    }
  });

export const getProjects = createServerFn({ method: "GET" })
  .middleware([requestMiddleware])
  .handler(async ({ context }): Promise<IProject[]> => {
    try {
      const posts = await loadPostsIndex(context.request, context.origin);
      return filterDrafts(posts.projects);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return [];
      }

      console.warn("Failed to load projects:", error);
      return [];
    }
  });

export const getBlogs = createServerFn({ method: "GET" })
  .middleware([requestMiddleware])
  .handler(async ({ context }): Promise<IBlog[]> => {
    try {
      const posts = await loadPostsIndex(context.request, context.origin);
      return filterDrafts(posts.blogs);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return [];
      }

      console.warn("Failed to load blogs:", error);
      return [];
    }
  });

export const getReviews = createServerFn({ method: "GET" })
  .middleware([requestMiddleware])
  .handler(async ({ context }): Promise<IReview[]> => {
    try {
      const posts = await loadPostsIndex(context.request, context.origin);
      return filterDrafts(posts.reviews);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return [];
      }

      console.warn("Failed to load reviews:", error);
      return [];
    }
  });

export const getBites = createServerFn({ method: "GET" })
  .middleware([requestMiddleware])
  .handler(async ({ context }): Promise<IBite[]> => {
    try {
      const posts = await loadPostsIndex(context.request, context.origin);
      return posts.bites;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return [];
      }

      console.warn("Failed to load bites:", error);
      return [];
    }
  });

const PostSchema = z.object({
  category: z.string().min(1),
  slug: z.string().min(1),
});

export const getFullPost = createServerFn({ method: "GET" })
  .inputValidator(PostSchema)
  .middleware([requestMiddleware])
  .handler(async ({ data, context }): Promise<IPost> => {
    try {
      return fetchAssetJson<IPost>(
        context.request,
        context.origin,
        `/compiled-posts/${data.category}/${data.slug}.json`
      );
    } catch (error) {
      console.error(
        `Failed to load post ${data.category}/${data.slug}:`,
        error
      );
      throw new Error(`Post not found: ${data.category}/${data.slug}`);
    }
  });
