import type { IPosts } from "@/types/Post";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "fs/promises";
import { join } from "node:path";
import { z } from "zod";

export const getMiniPosts = createServerFn({
  method: "GET",
}).handler(
  async ({ signal }: { signal?: AbortSignal } = {}): Promise<IPosts> => {
    try {
      // Check if request was aborted
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

      // Check again after async operation
      if (signal?.aborted) {
        throw new Error("Request aborted");
      }

      return JSON.parse(data) as IPosts;
    } catch (error) {
      if (
        signal?.aborted ||
        (error instanceof Error && error.message === "Request aborted")
      ) {
        throw error;
      }
      console.warn("Failed to load posts index:", error);
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
