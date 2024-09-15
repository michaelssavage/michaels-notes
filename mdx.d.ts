declare module "*.mdx" {
  import React from "react";
  const MDXComponent: React.ComponentType;
  export const meta: {
    id: number;
    date: string;
    image: string;
    github: string;
    technology: string[];
  };
  export default MDXComponent;
}
