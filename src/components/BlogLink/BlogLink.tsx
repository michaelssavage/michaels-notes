import { Link } from "@tanstack/react-router";
import styles from "./BlogLink.module.scss";
import { CSSProperties } from "react";

interface Props {
  link: string;
  text?: string;
  external?: boolean;
  style?: CSSProperties;
}

export const BlogLink = ({
  link,
  text,
  external = false,
  style = {},
}: Props) => {
  return (
    <Link
      className={styles.extLink}
      to={link}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      style={style}
    >
      {text ? text : link}
    </Link>
  );
};
