import { resolve } from 'path';

export default defineNuxtConfig({
	alias: {
		styles: resolve(__dirname, './assets/styles'),
		lists: resolve(__dirname, './assets/lists'),
	},

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},

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
				indent: 'tab',
				semi: true,
			},
		},
	},

	devtools: { enabled: true },

	modules: ['@nuxt/eslint', '@nuxt/content', '@nuxt/image'],

	runtimeConfig: {
		spotifyClientId: process.env.SPOTIFY_CLIENT_ID ?? '',
		spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
		spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN ?? '',

	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/scss/global.scss" as *;',
				},
			},
		},
	},

});
