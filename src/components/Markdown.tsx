import { Picture } from "./Picture";
import { ReactNode } from "@tanstack/react-router";
import { MDXComponents } from "node_modules/@mdx-js/react/lib";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components: MDXComponents = {
  Picture,
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
