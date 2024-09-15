import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
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
      const { data, content } = matter(source);

      const { code } = await bundleMDX({
        source: content,
        cwd: path.resolve(__dirname),
        globals,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        mdxOptions(options: Record<string, any>) {
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            rehypeMdxImportMedia,
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
        ...data,
        slug: file.replace(".mdx", ""),
        code,
      };
    })
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
