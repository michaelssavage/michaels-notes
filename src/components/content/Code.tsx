import type { HTMLAttributes } from "react";
import styles from "./content.module.scss";

export const Code = (props: HTMLAttributes<HTMLElement>) => {
  return <code className={styles.code} {...props} />;
};
