import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import storybookPlugin from "./src/lib/storybook";

const isDevBuild = !!process.env.VITE_ENV_DEV;

export default defineConfig({
  server: { port: 3000 },
  optimizeDeps: {
    include: ["@emotion/styled"],
    exclude: ["leaflet", "react-leaflet"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ["leaflet", "react-leaflet"],
        },
      },
    },
  },
  ssr: {
    optimizeDeps: {
      include: ["@emotion/styled"],
    },
    noExternal: [],
    external: ["leaflet", "react-leaflet"],
  },
  plugins: [
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    storybookPlugin(),
    ...(!isDevBuild ? [netlify()] : []),
    ...(!isDevBuild
      ? [
          visualizer({
            open: false,
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
    viteReact({
      include: /\.(mdx|tsx|ts)$/,
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
