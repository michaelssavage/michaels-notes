import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const isDevBuild = !!process.env.VITE_ENV_DEV;

export default defineConfig(({ isSsrBuild }) => {
  // Use isSsrBuild from Vite's config context
  const cacheDir = isSsrBuild
    ? "./node_modules/.vite-ssr"
    : "./node_modules/.vite-client";

  return {
    server: { port: 3000 },
    cacheDir,
    optimizeDeps: {
      include: ["@emotion/styled"],
    },
    ssr: {
      optimizeDeps: {
        include: ["@emotion/styled"],
      },
      external: isSsrBuild
        ? [
            "jsdom",
            "vitest",
            "@vitest/browser",
            "@vitest/coverage-v8",
            "@playwright/test",
            "playwright",
            "@testing-library/react",
            "@testing-library/dom",
            // Storybook - dev only
            "storybook",
            "@storybook/react",
            "@storybook/addon-a11y",
            "@storybook/addon-docs",
            "@storybook/addon-vitest",
            "@storybook/react-vite",
            "@chromatic-com/storybook",
          ]
        : undefined,
    },
    plugins: [
      viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(),
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
  };
});
