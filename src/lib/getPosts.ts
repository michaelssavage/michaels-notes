import type { IBite, IBlog, IPosts, IProject } from "@/types/Post";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

if (process.platform === "win32") {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "esbuild.exe"
  );
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild"
  );
}

interface MdxOptions {
  rehypePlugins?: unknown[];
  remarkPlugins?: unknown[];
  [key: string]: unknown;
}

const globals = {
  "@mdx-js/react": {
    varName: "MdxJsReact",
    namedExports: ["useMDXComponents"],
    defaultExport: false,
  },
};

function extractFrontmatter<T>(directory: string): T[] {
  if (!fs.existsSync(directory)) {
    console.warn(
      `extractFrontmatter: Directory not found: ${directory}. Returning empty array.`
    );
    return [];
  }

  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.resolve(directory, file);
    const source = fs.readFileSync(filePath, "utf-8");

    const { data: frontmatter } = matter(source);

    return {
      ...frontmatter,
      slug: file.replace(".mdx", ""),
    } as T;
  });
}

// Build-time index generation (lightweight)
export const getContentPosts = async (contentDir: string): Promise<IPosts> => {
  console.log(
    `getContentPosts: Starting to build content index from: ${contentDir}`
  );

  return {
    projects: extractFrontmatter<IProject>(path.join(contentDir, "projects")),
    blogs: extractFrontmatter<IBlog>(path.join(contentDir, "blogs")),
    reviews: extractFrontmatter<IBlog>(path.join(contentDir, "reviews")),
    bites: extractFrontmatter<IBite>(path.join(contentDir, "bites")),
  };
};

export async function getPostContent(category: string, slug: string) {
  const { bundleMDX } = await import("mdx-bundler");
  const rehypeHighlight = await import("rehype-highlight");
  const rehypeMdxImportMedia = await import("rehype-mdx-import-media");

  const filePath = path.resolve(
    process.cwd(),
    `src/content/${category}/${slug}.mdx`
  );

  console.log(`getPostContent: File does NOT exist at path: "${filePath}"`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `getPostContent: File does NOT exist at path: ${category}/${slug}`
    );
  }

  const source = fs.readFileSync(filePath, "utf-8");

  try {
    const { code, frontmatter } = await bundleMDX({
      source,
      cwd: path.resolve(process.cwd()),
      globals,
      mdxOptions(options: MdxOptions) {
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeMdxImportMedia.default,
          rehypeHighlight.default,
        ];
        return {
          ...options,
          providerImportSource: "@mdx-js/react",
        };
      },
      esbuildOptions: (options) => {
        options.loader = {
          ...options.loader,
          ".jpg": "dataurl",
          ".png": "dataurl",
        };
        options.external = options.external || [];
        options.external.push("src/assets/*");
        return options;
      },
    });

    return {
      ...frontmatter,
      slug,
      code,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `getPostContent: Error bundling MDX for ${category}/${slug}:`,
        error
      );
      throw new Error(`Failed to process post content: ${error.message}`);
    } else {
      console.error(
        `getPostContent: Unknown error bundling MDX for ${category}/${slug}:`,
        error
      );
      throw new Error("Failed to process post content: Unknown bundling error");
    }
  }
}
