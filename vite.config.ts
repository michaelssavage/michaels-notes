import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { type Plugin, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getContentPosts } from "./src/lib/getPosts";

async function getPostsData() {
  const contentDir = path.resolve(__dirname, "src/content");
  return await getContentPosts(contentDir);
}

function postsPlugin(): Plugin {
  return {
    name: "posts-plugin",
    async config() {
      const postsData = await getPostsData();
      return {
        define: {
          "import.meta.env.POSTS": JSON.stringify(postsData),
        },
      };
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    TanStackRouterVite({}),
    react({
      include: /\.(mdx|tsx|ts)$/,
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
    postsPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
