import { resolve } from "path";

export default defineNuxtConfig({
  routeRules: {
    "/": { ssr: false },
    "/blog": { ssr: false },
    "/projects": { ssr: false },
    "/bites": { ssr: false },
  },
  alias: {
    styles: resolve(__dirname, "./assets/styles"),
    lists: resolve(__dirname, "./assets/lists"),
  },

  modules: ["@nuxt/eslint", "@nuxt/content", "@nuxt/image"],

  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        semi: true,
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '~/assets/scss/global.scss' as *;
            `,
        },
      },
    },
  },

  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID ?? "",
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  content: {
    experimental: {
      search: {
        indexed: false,
      },
    },
    highlight: {
      langs: ["bash", "tex", "json"],
      theme: "github-dark",
    },
  },

  devtools: { enabled: true },
});
