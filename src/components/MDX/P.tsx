import { ReactNode } from "react";

export const P = ({ children }: { children?: ReactNode }) => {
  return <p className="mdx-p">{children}</p>;
};
