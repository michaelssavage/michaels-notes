import fs from "node:fs";
import path from "node:path";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import rehypeMdxImportMedia from "rehype-mdx-import-media";

const globals = {
	"@mdx-js/react": {
		varName: "MdxJsReact",
		namedExports: ["useMDXComponents"],
		defaultExport: false,
	},
};

async function processMDXFiles(directory: string) {
	const files = fs
		.readdirSync(directory)
		.filter((file) => file.endsWith(".mdx"));

	return await Promise.all(
		files.map(async (file) => {
			const filePath = path.resolve(directory, file);
			const source = fs.readFileSync(filePath, "utf-8");

			const { code, frontmatter } = await bundleMDX({
				source: source,
				cwd: path.resolve(__dirname),
				globals,
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				mdxOptions(options: Record<string, any>) {
					options.rehypePlugins = [
						...(options.rehypePlugins ?? []),
						rehypeMdxImportMedia,
						rehypeHighlight,
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
				slug: file.replace(".mdx", ""),
				code,
			};
		}),
	);
}

export const getContentPosts = async (contentDir: string) => {
	const contentFolders = fs
		.readdirSync(contentDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	return await contentFolders.reduce(async (accPromise, folder) => {
		const acc = await accPromise;
		const directoryPath = path.join(contentDir, folder);
		const processedFiles = await processMDXFiles(directoryPath);
		return { ...acc, [folder]: processedFiles };
	}, Promise.resolve({}));
};
