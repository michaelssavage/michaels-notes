import type { HTMLAttributes } from "react";
import styles from "./content.module.scss";

export const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className={styles.h1} {...props} />;
};
