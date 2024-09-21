import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactElement } from "react";
import { ExternalLinkIcon } from "../icons";
import styles from "./Anchor.module.scss";

interface Props {
  link: string;
  text?: string;
  external?: boolean;
  variant?: "button" | "blog";
  icon?: ReactElement;
  style?: CSSProperties;
}

export const Anchor = ({
  link,
  text,
  external = false,
  variant = "button",
  icon,
  style = {},
}: Props) => {
  const anchorClasses = `${styles.link} ${styles[variant]} ${external ? styles.external : ""}`;

  return (
    <Link
      to={link}
      className={anchorClasses}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      style={style}
    >
      {text ? text : link} {external && !icon ? <ExternalLinkIcon /> : icon}
    </Link>
  );
};
