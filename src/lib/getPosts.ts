import type { IPosts } from "@/types/Post";

export async function getPostsIndex(): Promise<IPosts> {
  try {
    const response = await fetch("/compiled-posts/index.json");

    if (response.ok) {
      const data = await response.json();
      return data as IPosts;
    }
  } catch (error) {
    console.warn("Failed to load posts index:", error);
    throw error;
  }

  return {
    projects: [],
    blogs: [],
    reviews: [],
    bites: [],
  };
}

// Load compiled post content
export async function getCompiledPost<T = unknown>(
  category: string,
  slug: string
): Promise<T> {
  try {
    // In build/SSR context
    if (typeof window === "undefined") {
      const fs = await import("node:fs");
      const path = await import("node:path");

      const postPath = path.join(
        process.cwd(),
        "public",
        "compiled-posts",
        category,
        `${slug}.json`
      );

      if (fs.existsSync(postPath)) {
        const data = fs.readFileSync(postPath, "utf-8");
        return JSON.parse(data) as T;
      }
    } else {
      // In browser context
      const response = await fetch(`/compiled-posts/${category}/${slug}.json`);
      if (response.ok) {
        return response.json() as T;
      }
    }

    throw new Error(`Post not found: ${category}/${slug}`);
  } catch (error) {
    console.error(`Failed to load post ${category}/${slug}:`, error);
    throw error;
  }
}
