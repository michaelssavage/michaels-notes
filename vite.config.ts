import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getContentPosts } from "./src/lib/getPosts";

function postsPlugin(): Plugin {
  return {
    name: "posts-plugin",
    async config() {
      // Only embed the lightweight index
      const contentDir = path.resolve(process.cwd(), "src/content");
      const postsIndex = await getContentPosts(contentDir);
      return {
        define: {
          "import.meta.env.POSTS_INDEX": JSON.stringify(postsIndex),
        },
      };
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({
      include: /\.(mdx|tsx|ts)$/,
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
    postsPlugin(),
    visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    emptyOutDir: true,
    sourcemap: mode === "development",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/")[1].split("/");
            return parts[0].startsWith("@")
              ? `${parts[0]}/${parts[1]}`
              : parts[0];
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
      external: ["esbuild"],
    },
    chunkSizeWarningLimit: 1000,
    optimizeDeps: {
      include: ["@emotion/react", "@emotion/styled", "react", "react-dom"],
      exclude: ["esbuild"],
    },
    esbuild: {
      logLevel: "info",
      drop: mode === "production" ? ["console", "debugger"] : [],
      treeShaking: true,
      minifyIdentifiers: mode === "production",
      minifySyntax: mode === "production",
      minifyWhitespace: mode === "production",
      ignoreAnnotations: false,
    },
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === "js") {
        return { js: `/${filename}` };
      }
      return { relative: true };
    },
  },
}));
