import type { HTMLAttributes } from "react";
import styles from "./content.module.scss";

export const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <h2 className={styles.h2} {...props} />;
};
