import { resolve } from "path";

export default defineNuxtConfig({
  alias: {
    styles: resolve(__dirname, "./assets/styles"),
    lists: resolve(__dirname, "./assets/lists"),
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/content"],

  content: {
    experimental: {
      search: {
        indexed: true,
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        semi: true,
      },
    },
  },
});
