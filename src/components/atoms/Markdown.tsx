import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types.js";
import { getMDXComponent } from "mdx-bundler/client";
import { memo, useMemo } from "react";
import { OrderedList } from "@/components/content/OrderedList";
import { Paragraph } from "@/components/content/Paragraph";
import { UnorderedList } from "@/components/content/UnorderedList";
import { Anchor } from "@/components/molecules/Anchor";
import { Picture } from "@/components/molecules/Picture";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import { ImgPositioner } from "../../styles/routes/blog.styled";
import { BlockQuote, Code, H1 } from "../content";
import { Board } from "./Board";
import { Floating } from "./Floating";
import { Group } from "./Group";
import { Player } from "./Player";

const MDX_GLOBAL_CONFIG = {
	MdxJsReact: {
		useMDXComponents,
	},
};

const components: MDXComponents = {
	Picture,
	Anchor,
	Board,
	p: Paragraph,
	ol: OrderedList,
	ul: UnorderedList,
	h1: H1,
	blockquote: BlockQuote,
	code: Code,
	ImgPositioner,
	CurrentPlay,
	Player,
	Group,
	Floating,
};

interface MarkdownProps {
	content: {
		code: string;
		title: string;
		description: string;
	};
}

const Markdown = memo(({ content }: MarkdownProps) => {
	const Component = useMemo(() => {
		try {
			return getMDXComponent(content.code, MDX_GLOBAL_CONFIG);
		} catch (error) {
			console.error("Error parsing MDX component:", error);
			return () => <div>Error loading content</div>;
		}
	}, [content]);

	return (
		<MDXProvider components={components}>
			<Component title={content.title} description={content.description} />
		</MDXProvider>
	);
});

Markdown.displayName = "Markdown";
export default Markdown;
