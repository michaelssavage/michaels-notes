import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import type { ReactNode } from "@tanstack/react-router";
import { getMDXComponent } from "mdx-bundler/client";
import type { MDXComponents } from "node_modules/@mdx-js/react/lib";
import { useMemo } from "react";
import { BlogLink } from "./BlogLink/BlogLink";
import { Picture } from "./Picture";

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components: MDXComponents = {
  Picture,
  BlogLink,
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
