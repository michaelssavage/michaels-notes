import type {
  IBite,
  IBlog,
  IPost,
  IPosts,
  IProject,
  IReview,
} from "@/types/Post";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

interface CloudflareEnv {
  ASSETS: { fetch: typeof fetch };
}

function filterDrafts<T extends { draft?: boolean }>(items: T[]): T[] {
  return isProd ? items.filter((item) => !item.draft) : items;
}

async function fetchAssetJson<T>(path: string): Promise<T> {
  try {
    const { env } = await import("cloudflare:workers");

    return await (env as unknown as CloudflareEnv).ASSETS.fetch(
      new Request(`http://assets.internal${path}`)
    ).then((r) => r.json());
  } catch {
    const request = getRequest();
    if (!request) throw new Error("No request context available");

    const origin = new URL(request.url).origin;
    const res = await fetch(`${origin}${path}`);

    if (!res.ok)
      throw new Error(`Failed to fetch asset ${path}: ${res.status}`);

    return res.json();
  }
}

async function loadPostsIndex(): Promise<IPosts> {
  return fetchAssetJson<IPosts>("/compiled-posts/index.json");
}

export const getMiniPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<IPosts> => {
    try {
      const posts = await loadPostsIndex();
      posts.blogs = filterDrafts(posts.blogs);
      posts.projects = filterDrafts(posts.projects);
      posts.reviews = filterDrafts(posts.reviews);
      return posts;
    } catch (error) {
      console.warn("Failed to load posts index:", error);
      return { projects: [], blogs: [], reviews: [], bites: [] };
    }
  }
);

export const getProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<IProject[]> => {
    try {
      const posts = await loadPostsIndex();
      return filterDrafts(posts.projects);
    } catch (error) {
      console.warn("Failed to load projects:", error);
      return [];
    }
  }
);

export const getBlogs = createServerFn({ method: "GET" }).handler(
  async (): Promise<IBlog[]> => {
    try {
      const posts = await loadPostsIndex();
      return filterDrafts(posts.blogs);
    } catch (error) {
      console.warn("Failed to load blogs:", error);
      return [];
    }
  }
);

export const getReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<IReview[]> => {
    try {
      const posts = await loadPostsIndex();
      return filterDrafts(posts.reviews);
    } catch (error) {
      console.warn("Failed to load reviews:", error);
      return [];
    }
  }
);

export const getBites = createServerFn({ method: "GET" }).handler(
  async (): Promise<IBite[]> => {
    try {
      const posts = await loadPostsIndex();
      return posts.bites;
    } catch (error) {
      console.warn("Failed to load bites:", error);
      return [];
    }
  }
);

const PostSchema = z.object({
  category: z.string().min(1),
  slug: z.string().min(1),
});

export const getFullPost = createServerFn({ method: "GET" })
  .inputValidator(PostSchema)
  .handler(async ({ data }): Promise<IPost> => {
    try {
      const post = await fetchAssetJson<IPost>(
        `/compiled-posts/${data.category}/${data.slug}.json`
      );
      return post;
    } catch (error) {
      console.error(
        `Failed to load post ${data.category}/${data.slug}:`,
        error
      );
      throw new Error(`Post not found: ${data.category}/${data.slug}`);
    }
  });
