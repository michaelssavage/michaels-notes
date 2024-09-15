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
  content: ReactNode;
}

export const Markdown = ({ content }: MarkdownProps) => {
  console.log("!!!", content);
  const Component = useMemo(() => {
    return getMDXComponent(content, MDX_GLOBAL_CONFIG);
  }, [content]);

  return (
    <MDXProvider components={components}>
      <Component />
    </MDXProvider>
  );
};
