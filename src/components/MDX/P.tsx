import { ReactNode } from "react";
// import styles from "styles/blog.module.scss";

export const P = ({ children }: { children?: ReactNode }) => {
  return <p className="mdx-p">{children}</p>;
};
