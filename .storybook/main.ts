import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
  // Configure base path for deployment at /storybook
  // This ensures assets are loaded correctly when served from a subdirectory
  viteFinal: async (config) => {
    // Set base path for production builds
    if (process.env.NODE_ENV === "production") {
      config.base = "/storybook/";
    }
    return config;
  },
};
export default config;
