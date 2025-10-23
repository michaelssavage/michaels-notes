import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  server: { port: 3000, open: true },
  ssr: { noExternal: ["@emotion/*"] },
  optimizeDeps: { include: ["@emotion/react", "@emotion/styled"] },
  plugins: [
    tanstackStart(),
    netlify(),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    viteReact({
      include: /\.(mdx|tsx|ts)$/,
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});

export default config;
