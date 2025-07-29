import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { IBite, IBlog, IPosts, IProject } from "@/types/Post";

if (process.platform === "win32") {
	process.env.ESBUILD_BINARY_PATH = path.join(
		process.cwd(),
		"node_modules",
		"esbuild",
		"esbuild.exe",
	);
} else {
	process.env.ESBUILD_BINARY_PATH = path.join(
		process.cwd(),
		"node_modules",
		"esbuild",
		"bin",
		"esbuild",
	);
}

interface MdxOptions {
	rehypePlugins?: unknown[];
	remarkPlugins?: unknown[];
	[key: string]: unknown;
}

const globals = {
	"@mdx-js/react": {
		varName: "MdxJsReact",
		namedExports: ["useMDXComponents"],
		defaultExport: false,
	},
};

function extractFrontmatter<T>(directory: string): T[] {
	const files = fs
		.readdirSync(directory)
		.filter((file) => file.endsWith(".mdx"));

	return files.map((file) => {
		const filePath = path.resolve(directory, file);
		const source = fs.readFileSync(filePath, "utf-8");

		const { data: frontmatter, content } = matter(source);

		const excerpt = `${content
			.split("\n\n")[0]
			.replace(/[#*`]/g, "")
			.substring(0, 160)}...`;

		return {
			...frontmatter,
			slug: file.replace(".mdx", ""),
			excerpt,
		} as T;
	});
}

// Build-time index generation (lightweight)
export const getContentPosts = async (contentDir: string): Promise<IPosts> => {
	return {
		projects: extractFrontmatter<IProject>(path.join(contentDir, "projects")),
		blogs: extractFrontmatter<IBlog>(path.join(contentDir, "blogs")),
		bites: extractFrontmatter<IBite>(path.join(contentDir, "bites")),
	};
};

export async function getPostContent(category: string, slug: string) {
	const { bundleMDX } = await import("mdx-bundler");
	const rehypeHighlight = await import("rehype-highlight");
	const rehypeMdxImportMedia = await import("rehype-mdx-import-media");

	const filePath = path.resolve(
		process.cwd(),
		`src/content/${category}/${slug}.mdx`,
	);

	if (!fs.existsSync(filePath)) {
		throw new Error(`Post not found: ${category}/${slug}`);
	}

	const source = fs.readFileSync(filePath, "utf-8");

	const { code, frontmatter } = await bundleMDX({
		source,
		cwd: path.resolve(process.cwd()),
		globals,
		mdxOptions(options: MdxOptions) {
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeMdxImportMedia.default,
				rehypeHighlight.default,
			];
			return {
				...options,
				providerImportSource: "@mdx-js/react",
			};
		},
		esbuildOptions: (options) => {
			options.loader = {
				...options.loader,
				".jpg": "dataurl",
				".png": "dataurl",
			};
			return options;
		},
	});

	return {
		...frontmatter,
		slug,
		code,
	};
}
