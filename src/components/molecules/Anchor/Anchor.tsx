import type { SerializedStyles } from "@emotion/react";
import { memo, type ReactElement } from "react";
import { LinkStyle } from "./Anchor.styled";

export type AnchorVariants = "button" | "link" | "text" | "header" | "footer";

interface Props {
  link: string;
  text?: string;
  isExternal?: boolean;
  variant?: AnchorVariants;
  icon?: ReactElement;
  style?: SerializedStyles;
}

export const Anchor = memo(
  ({
    link,
    text,
    icon,
    isExternal = false,
    variant = "button",
    style,
  }: Props) => {
    return (
      <LinkStyle
        to={link}
        variant={variant}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        style={style}
      >
        {icon} {text ? text : link}
      </LinkStyle>
    );
  }
);

Anchor.displayName = "Anchor";
