import { ReactNode } from "react";

export const H1 = ({ children }: { children?: ReactNode }) => {
  return <h1 className="mdx-h1">{children}</h1>;
};
