import { LinkStyle } from "@/components/Anchor/Anchor.styled";
import type { CSSProperties, ReactElement } from "react";
import { ExternalLinkIcon } from "../icons";

export type AnchorVariants = "button" | "link";

interface Props {
  link: string;
  text?: string;
  isExternal?: boolean;
  variant?: AnchorVariants;
  icon?: ReactElement;
  style?: CSSProperties;
}

export const Anchor = ({
  link,
  text,
  icon,
  isExternal = false,
  variant = "button",
  style = {},
}: Props) => {
  return (
    <LinkStyle
      to={link}
      variant={variant}
      isExternal={isExternal}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      style={style}
    >
      {text ? text : link} {isExternal && !icon ? <ExternalLinkIcon /> : icon}
    </LinkStyle>
  );
};
