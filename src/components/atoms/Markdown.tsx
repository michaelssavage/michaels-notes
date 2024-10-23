import { Anchor } from "@/components/molecules/Anchor";
import { Picture } from "@/components/molecules/Picture";
import { CurrentPlay } from "@/components/spotify/CurrentPlay";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import type { ReactNode } from "@tanstack/react-router";
import { getMDXComponent } from "mdx-bundler/client";
import type { MDXComponents } from "node_modules/@mdx-js/react/lib";
import { memo, useMemo } from "react";
import { ImgPositioner } from "../../styles/routes/blog.styled";
import { BlockQuote, Code, H1 } from "../content";

const MDX_GLOBAL_CONFIG = {
	MdxJsReact: {
		useMDXComponents,
	},
};

const components: MDXComponents = {
	Picture,
	Anchor,
	h1: H1,
	blockquote: BlockQuote,
	code: Code,
	ImgPositioner,
	CurrentPlay,
};

interface MarkdownProps {
	content: {
		code: ReactNode;
		title: string;
		description: string;
	};
}

export const Markdown = memo(({ content }: MarkdownProps) => {
	const Component = useMemo(() => {
		return getMDXComponent(content.code, MDX_GLOBAL_CONFIG);
	}, [content]);

	return (
		<MDXProvider components={components}>
			<Component title={content.title} description={content.description} />
		</MDXProvider>
	);
});
