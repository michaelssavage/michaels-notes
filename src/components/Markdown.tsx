import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import type { ReactNode } from "@tanstack/react-router";
import { getMDXComponent } from "mdx-bundler/client";
import type { MDXComponents } from "node_modules/@mdx-js/react/lib";
import { useMemo } from "react";
import { Anchor } from "./Anchor/Anchor";
import { Picture } from "./Picture";
import { H1 } from "./content/H1";

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components: MDXComponents = {
  Picture,
  Anchor,
  h1: H1,
};

interface MarkdownProps {
  content: {
    code: ReactNode;
    title: string;
  };
}

export const Markdown = ({ content }: MarkdownProps) => {
  const Component = useMemo(() => {
    return getMDXComponent(content.code, MDX_GLOBAL_CONFIG);
  }, [content]);

  console.log("!!!", {
    content,
  });

  return (
    <MDXProvider components={components}>
      <Component title={content.title} />
    </MDXProvider>
  );
};
