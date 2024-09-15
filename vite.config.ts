import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { bundleMDX } from "mdx-bundler";

const globals = {
  "@mdx-js/react": {
    varName: "MdxJsReact",
    namedExports: ["useMDXComponents"],
    defaultExport: false,
  },
};

const projectPosts = await Promise.all(
  fs
    .readdirSync(path.resolve(__dirname, "src/content/projects"))
    .filter((file) => file.endsWith(".mdx"))
    .map(async (file) => {
      const filePath = path.resolve(__dirname, "src/content/projects", file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);

      const { code } = await bundleMDX({
        source: content,
        cwd: path.resolve(__dirname, "src"),
        globals,
        mdxOptions(options: Record<string, any>) {
          return {
            ...options,
            providerImportSource: "@mdx-js/react",
          };
        },
      });

      return {
        ...data,
        slug: file.replace(".mdx", ""),
        code,
      };
    })
);

export default defineConfig({
  plugins: [
    TanStackRouterVite({}),
    react({ include: /\.(mdx|tsx|ts)$/ }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  define: {
    "import.meta.env.BLOG_POSTS": JSON.stringify(projectPosts),
  },
  css: {
    preprocessorOptions: {
      scss: {
        importer: (url: string) => {
          if (url.startsWith("@/")) {
            return { file: path.resolve(__dirname, "src", url.slice(2)) };
          }
          return null;
        },
      },
    },
  },
});
