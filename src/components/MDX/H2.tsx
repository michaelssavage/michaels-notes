import { ReactNode } from "react";
import styles from "styles/mdx.module.scss";

export const H2 = ({ children }: { children?: ReactNode }) => {
  return <h2 className={styles.header2}>{children}</h2>;
};
