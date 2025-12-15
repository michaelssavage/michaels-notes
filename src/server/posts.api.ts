import type { IPosts } from "@/types/Post";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "fs/promises";
import { join } from "node:path";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

export const getMiniPosts = createServerFn({
  method: "GET",
}).handler(
  async ({ signal }: { signal?: AbortSignal } = {}): Promise<IPosts> => {
    try {
      if (signal?.aborted) {
        throw new Error("Request aborted");
      }

      const filePath = join(
        process.cwd(),
        "public",
        "compiled-posts",
        "index.json"
      );
      const data = await readFile(filePath, "utf-8");

      if (signal?.aborted) {
        throw new Error("Request aborted");
      }

      const posts = JSON.parse(data) as IPosts;

      if (isProd) {
        posts.blogs = posts.blogs.filter((p) => !p.draft);
        posts.projects = posts.projects.filter((p) => !p.draft);
        posts.reviews = posts.reviews.filter((p) => !p.draft);
      }

      return posts;
    } catch (error) {
      console.warn("Failed to load posts index:", error);

      if (
        signal?.aborted ||
        (error instanceof Error && error.name === "AbortError")
      ) {
        return {
          projects: [],
          blogs: [],
          reviews: [],
          bites: [],
        };
      }
      return {
        projects: [],
        blogs: [],
        reviews: [],
        bites: [],
      };
    }
  }
);

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
