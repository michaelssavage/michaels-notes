import type { Handler } from "@netlify/functions";
import fs from "node:fs";
import path from "node:path";

const MDX_BUNDLER_DEPS = [
  "mdx-bundler",
  "rehype-highlight",
  "rehype-mdx-import-media",
  "@mdx-js/react",
];

// Check for required dependencies on cold start
MDX_BUNDLER_DEPS.forEach((dep) => {
  try {
    require.resolve(dep);
  } catch (error) {
    console.error(`Missing dependency: ${dep}`, error);
    throw new Error(
      `Required dependency ${dep} is not available in the function environment`
    );
  }
});

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

async function getPostContent(category: string, slug: string) {
  const { bundleMDX } = await import("mdx-bundler");
  const rehypeHighlight = await import("rehype-highlight");
  const rehypeMdxImportMedia = await import("rehype-mdx-import-media");

  const filePath = path.resolve(
    process.cwd(),
    `src/content/${category}/${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`File does NOT exist at path: ${filePath}`);
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

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const category = event.queryStringParameters?.category;
    const slug = event.queryStringParameters?.slug;

    if (!category || !slug) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Missing required parameters",
          required: ["category", "slug"],
        }),
      };
    }

    const post = await getPostContent(category, slug);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Post not found";

    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: errorMessage,
        category: event.queryStringParameters?.category,
        slug: event.queryStringParameters?.slug,
      }),
    };
  }
};
