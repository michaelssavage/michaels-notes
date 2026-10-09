import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/components/atoms/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/molecules/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/icons/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  // Only the public assets the stories use, not the whole site's public/ folder.
  staticDirs: [
    { from: "../public/fonts", to: "/fonts" },
    { from: "../public/favicon.svg", to: "/favicon.svg" },
    { from: "../public/not-found.png", to: "/not-found.png" },
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // vite.config.ts is shared with the app. Its Cloudflare and TanStack Start
  // plugins build a Worker and SSR bundle, which Storybook doesn't need.
  viteFinal: async (config) => {
    const plugins = await Promise.all((config.plugins ?? []).flat(Infinity));
    config.plugins = plugins.flat(Infinity).filter((plugin) => {
      const name = plugin && "name" in plugin ? plugin.name : "";
      return !/cloudflare|tanstack/i.test(name);
    });
    config.publicDir = false;
    return config;
  },
};
export default config;
