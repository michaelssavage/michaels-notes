import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
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
		TanStackRouterVite({}),
		react({
			include: /\.(mdx|tsx|ts)$/,
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion/babel-plugin"],
			},
		}),
		tsconfigPaths(),
		postsPlugin(),
	],
	build: {
		outDir: "dist",
		cssCodeSplit: true,
		minify: "esbuild",
		emptyOutDir: true,
		sourcemap: mode === "development",
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
			},
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						if (id.includes("@emotion")) return "vendor-emotion";
						if (id.includes("react")) return "vendor-react";
						if (id.includes("@tanstack")) return "vendor-tanstack";
						return "vendor";
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
