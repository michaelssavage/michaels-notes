import { ButtonStyled } from "@/components/Button/Button.styled";
import type { ReactElement } from "react";

export type ButtonVariants = "primary" | "secondary" | "ghost";

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  type?: "submit" | "button";
  icon?: ReactElement;
  variant?: ButtonVariants;
  onClick?: () => void;
  active?: boolean;
}

export const Button = ({
  text,
  disabled,
  type = "button",
  variant = "primary",
  icon,
  onClick,
  active = false,
}: ButtonProps) => {
  return (
    <ButtonStyled
      disabled={disabled}
      type={type}
      onClick={onClick}
      variant={variant}
      active={active}
    >
      {text} {icon}
    </ButtonStyled>
  );
};
