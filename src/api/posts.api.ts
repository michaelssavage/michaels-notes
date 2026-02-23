import type { IBite, IBlog, IPosts, IProject, IReview } from "@/types/Post";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "fs/promises";
import { join } from "node:path";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

function filterDrafts<T extends { draft?: boolean }>(items: T[]): T[] {
  return isProd ? items.filter((item) => !item.draft) : items;
}

async function loadPostsIndex(): Promise<IPosts> {
  const filePath = join(
    process.cwd(),
    "public",
    "compiled-posts",
    "index.json"
  );
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data) as IPosts;
}

export const getMiniPosts = createServerFn({
  method: "GET",
}).handler(async (): Promise<IPosts> => {
  try {
    const posts = await loadPostsIndex();

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

export const getProjects = createServerFn({
  method: "GET",
}).handler(async (): Promise<IProject[]> => {
  try {
    const posts = await loadPostsIndex();
    return filterDrafts(posts.projects);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return [];
    }

    console.warn("Failed to load projects:", error);
    return [];
  }
});

export const getBlogs = createServerFn({
  method: "GET",
}).handler(async (): Promise<IBlog[]> => {
  try {
    const posts = await loadPostsIndex();
    return filterDrafts(posts.blogs);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return [];
    }

    console.warn("Failed to load blogs:", error);
    return [];
  }
});

export const getReviews = createServerFn({
  method: "GET",
}).handler(async (): Promise<IReview[]> => {
  try {
    const posts = await loadPostsIndex();
    return filterDrafts(posts.reviews);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return [];
    }

    console.warn("Failed to load reviews:", error);
    return [];
  }
});

export const getBites = createServerFn({
  method: "GET",
}).handler(async (): Promise<IBite[]> => {
  try {
    const posts = await loadPostsIndex();
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

export const getFullPost = createServerFn({
  method: "GET",
})
  .inputValidator(PostSchema)
  .handler(async ({ data }) => {
    try {
      const postPath = join(
        process.cwd(),
        "public",
        "compiled-posts",
        data.category,
        `${data.slug}.json`
      );

      const fileContent = await readFile(postPath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(
        `Failed to load post ${data.category}/${data.slug}:`,
        error
      );
      throw new Error(`Post not found: ${data.category}/${data.slug}`);
    }
  });
