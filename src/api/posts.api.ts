import type { IBite, IBlog, IPosts, IProject, IReview } from "@/types/Post";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

function filterDrafts<T extends { draft?: boolean }>(items: T[]): T[] {
  return isProd ? items.filter((item) => !item.draft) : items;
}

// Exposes the request origin so server functions can fetch static assets
// via HTTP — required for Cloudflare Workers (no fs access).
// In local dev the origin is http://localhost:3000, Vite serves public/ there.
const requestMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    return next({ context: { origin: new URL(request.url).origin } });
  }
);

async function loadPostsIndex(origin: string): Promise<IPosts> {
  const res = await fetch(`${origin}/compiled-posts/index.json`);
  if (!res.ok) throw new Error(`Failed to fetch posts index: ${res.status}`);
  return res.json() as Promise<IPosts>;
}

export const getMiniPosts = createServerFn({ method: "GET" })
  .middleware([requestMiddleware])
  .handler(async ({ context }): Promise<IPosts> => {
    try {
      const posts = await loadPostsIndex(context.origin);

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
      const posts = await loadPostsIndex(context.origin);
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
      const posts = await loadPostsIndex(context.origin);
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
      const posts = await loadPostsIndex(context.origin);
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
      const posts = await loadPostsIndex(context.origin);
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
  .handler(async ({ data, context }) => {
    try {
      const res = await fetch(
        `${context.origin}/compiled-posts/${data.category}/${data.slug}.json`
      );
      if (!res.ok)
        throw new Error(`Post not found: ${data.category}/${data.slug}`);
      return res.json();
    } catch (error) {
      console.error(
        `Failed to load post ${data.category}/${data.slug}:`,
        error
      );
      throw new Error(`Post not found: ${data.category}/${data.slug}`);
    }
  });