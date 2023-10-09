import { ReactNode } from "react";
import styles from "./MDX.module.scss";

interface ButtonProps {
  link: string;
  title?: string;
  children?: ReactNode;
}

export const Button = ({ link, title = "Github Link", children }: ButtonProps) => {
  return (
    <button className={styles.linkButton}>
      <a target="_blank" rel="noopener noreferrer" href={link}>
        {children ?? title}
      </a>
    </button>
  );
};
