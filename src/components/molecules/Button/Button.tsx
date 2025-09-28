import type { SerializedStyles } from "@emotion/react";
import type { ReactElement } from "react";
import { ButtonStyled } from "./Button.styled";

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "ghost"
  | "pill"
  | "link";

export interface ButtonProps {
  id?: string;
  text?: string;
  disabled?: boolean;
  type?: "submit" | "button";
  icon?: ReactElement;
  variant?: ButtonVariants;
  onClick?: () => void;
  active?: boolean;
  selected?: boolean;
  styles?: SerializedStyles;
}

export const Button = ({
  id,
  text,
  disabled,
  type = "button",
  variant = "primary",
  icon,
  onClick,
  active = false,
  selected = false,
  styles,
}: ButtonProps) => {
  return (
    <ButtonStyled
      {...(id ? { id } : {})}
      disabled={disabled}
      type={type}
      onClick={onClick}
      variant={variant}
      active={active}
      data-active={active}
      selected={selected}
      data-selected={selected}
      styles={styles}
    >
      {text} {icon}
    </ButtonStyled>
  );
};
