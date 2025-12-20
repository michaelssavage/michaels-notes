import { sortByDate } from "@/lib/utils";
import type { IBite, IBlog, IPosts, IProject, IReview } from "@/types/Post";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

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

async function compilePost(category: string, slug: string, filePath: string) {
  console.log(`Compiling ${category}/${slug}...`);

  const { bundleMDX } = await import("mdx-bundler");
  const rehypeHighlight = await import("rehype-highlight");
  const rehypeMdxImportMedia = await import("rehype-mdx-import-media");

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
        return options;
      },
    });

    return {
      ...frontmatter,
      slug,
      code,
    };
  } catch (error) {
    console.error(`Error compiling ${category}/${slug}:`, error);
    throw error;
  }
}

function extractFrontmatter<T>(directory: string): T[] {
  if (!fs.existsSync(directory)) {
    console.warn(`Directory not found: ${directory}`);
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

async function compileAllPosts(contentDir: string) {
  console.log("Starting MDX compilation...");

  const outputDir = path.join(process.cwd(), "public", "compiled-posts");

  fs.mkdirSync(outputDir, { recursive: true });

  const postsIndex: IPosts = {
    projects: extractFrontmatter<IProject>(
      path.join(contentDir, "projects")
    ).sort(sortByDate),
    blogs: extractFrontmatter<IBlog>(path.join(contentDir, "blogs")).sort(
      sortByDate
    ),
    reviews: extractFrontmatter<IReview>(path.join(contentDir, "reviews")).sort(
      sortByDate
    ),
    bites: extractFrontmatter<IBite>(path.join(contentDir, "bites")).sort(
      sortByDate
    ),
  };

  fs.writeFileSync(
    path.join(outputDir, "index.json"),
    JSON.stringify(postsIndex, null, 2)
  );

  console.log("Posts index compiled successfully");

  const categories = ["projects", "blogs", "reviews", "bites"] as const;

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category);

    if (!fs.existsSync(categoryDir)) continue;

    const categoryOutputDir = path.join(outputDir, category);
    fs.mkdirSync(categoryOutputDir, { recursive: true });

    const files = fs
      .readdirSync(categoryDir)
      .filter((file) => file.endsWith(".mdx"));

    console.log(`\nCompiling ${files.length} ${category}...`);

    for (const file of files) {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(categoryDir, file);

      try {
        const compiledPost = await compilePost(category, slug, filePath);

        fs.writeFileSync(
          path.join(categoryOutputDir, `${slug}.json`),
          JSON.stringify(compiledPost, null, 2)
        );

        console.log(`✓ ${category}/${slug}`);
      } catch (error) {
        console.error(`✗ ${category}/${slug}:`, error);
      }
    }
  }

  console.log("\n🎉 MDX compilation complete!");
}

const contentDir = path.join(process.cwd(), "src", "content");
compileAllPosts(contentDir).catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
