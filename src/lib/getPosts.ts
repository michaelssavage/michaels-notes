import type { IBite, IBlog, IPosts, IProject } from "@/types/Post";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

function setEsbuildPath() {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const possiblePaths = [
      path.join(process.cwd(), "node_modules", "esbuild", "bin", "esbuild"),
      path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        "esbuild",
        "bin",
        "esbuild"
      ),
      "/var/task/node_modules/esbuild/bin/esbuild",
      "/opt/nodejs/node_modules/esbuild/bin/esbuild",
    ];

    for (const esbuildPath of possiblePaths) {
      if (fs.existsSync(esbuildPath)) {
        process.env.ESBUILD_BINARY_PATH = esbuildPath;
        console.log(`Found esbuild at: ${esbuildPath}`);
        return;
      }
    }

    console.warn("Could not find esbuild binary in expected locations");
  } else {
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
  }
}

setEsbuildPath();

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
