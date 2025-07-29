import path from "node:path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
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

export default defineConfig(({ mode }) => ({
	server: {
		port: 3000,
		open: true,
	},
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			experimental: {
				enableCodeSplitting: true,
			},
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
		...(mode === "production"
			? [
					visualizer({
						open: false,
						filename: "dist/stats.html",
						gzipSize: true,
						brotliSize: true,
					}),
				]
			: []),
	],
	build: {
		outDir: "dist",
		cssCodeSplit: true,
		cssMinify: "lightningcss",
		minify: "esbuild",
		emptyOutDir: true,
		sourcemap: mode === "development",
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
			},
			output: {
				manualChunks(id) {
					const modulePath = id.toString();

					if (modulePath.includes("node_modules")) {
						if (modulePath.includes("@tanstack/react-router"))
							return "tanstack-router";
						if (modulePath.includes("@tanstack/react-query"))
							return "tanstack-query";
						if (modulePath.includes("framer-motion")) return "framer-motion";
						if (modulePath.includes("@emotion")) return "emotion";
						if (modulePath.includes("react-dom")) return "react-dom";
						if (
							modulePath.includes("react") &&
							!modulePath.includes("react-dom")
						)
							return "react";

						if (
							modulePath.includes("@mdx-js") ||
							modulePath.includes("mdx-bundler")
						)
							return "mdx-vendor";

						if (
							modulePath.includes("@floating-ui") ||
							modulePath.includes("react-intersection-observer") ||
							modulePath.includes("react-helmet-async") ||
							modulePath.includes("react-toastify") ||
							modulePath.includes("react-transition-group")
						)
							return "ui-utils";

						if (modulePath.includes("posthog")) return "analytics";

						return "vendor";
					}

					if (modulePath.includes("src/components")) return "components";
					if (modulePath.includes("src/lib")) return "lib";
					if (modulePath.includes("src/content")) return "content";
					if (modulePath.includes("src/api")) return "api";
					if (modulePath.includes("src/styles")) return "styles";
					if (modulePath.includes("src/types")) return "types";
				},
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
		chunkSizeWarningLimit: 1000,
		optimizeDeps: {
			include: ["@emotion/react", "@emotion/styled", "react", "react-dom"],
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
