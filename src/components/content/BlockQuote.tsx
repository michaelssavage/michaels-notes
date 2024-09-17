import type { HTMLAttributes } from "react";
import styles from "./content.module.scss";

export const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <blockquote className={styles.blockquote} {...props} />;
};
