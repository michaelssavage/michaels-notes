import { BlockQuote } from "@/components/content/BlockQuote";
import { H1 } from "@/components/content/H1";
import { H2 } from "@/components/content/H2";
import { H3 } from "@/components/content/H3";
import { InlineCode } from "@/components/content/InlineCode";
import { OrderedList } from "@/components/content/OrderedList";
import { Paragraph } from "@/components/content/Paragraph";
import { Pre } from "@/components/content/Pre";
import { UnorderedList } from "@/components/content/UnorderedList";
import { Anchor } from "@/components/molecules/Anchor";
import { FillInTheBlank } from "@/components/molecules/FillTheBlank/FillTheBlank";
import { Picture } from "@/components/molecules/Picture";
import { CurrentPlay } from "@/components/spotify/CurrentPlay/CurrentPlay";
import { ImgPositioner } from "@/styles/routes/blog.styled";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { getMDXComponent } from "mdx-bundler/client";
import { memo, useMemo } from "react";
import { Board } from "./Board";
import { Floating } from "./Floating";
import { Group } from "./Group";
import { Player } from "./Player";

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components = {
  Picture,
  Anchor,
  Board,
  p: Paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  h1: H1,
  h2: H2,
  h3: H3,
  blockquote: BlockQuote,
  pre: Pre,
  code: InlineCode,
  ImgPositioner,
  CurrentPlay,
  Player,
  Group,
  Floating,
  FillInTheBlank,
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
      const ErrorComponent = () => <div>Error loading content</div>;
      ErrorComponent.displayName = "MDXErrorComponent";
      return ErrorComponent;
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
