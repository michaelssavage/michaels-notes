import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
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
		TanStackRouterVite({ autoCodeSplitting: true }),
		react({
			include: /\.(mdx|tsx|ts)$/,
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion/babel-plugin"],
			},
		}),
		tsconfigPaths(),
		postsPlugin(),
		visualizer({ open: true }),
	],
	build: {
		outDir: "dist",
		cssCodeSplit: true,
		cssMinify: true,
		minify: "esbuild",
		emptyOutDir: true,
		sourcemap: mode === "development",
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
			},
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id
							.toString()
							.split("node_modules/")[1]
							.split("/")[0]
							.toString();
					}
				},
			},
		},
		optimizeDeps: {
			include: ["@emotion/react", "@emotion/styled"],
		},
		esbuild: {
			logLevel: "info",
			drop: mode === "production" ? ["console", "debugger"] : [],
		},
	},
}));
