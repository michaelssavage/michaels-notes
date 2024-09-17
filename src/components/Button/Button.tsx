import type { ReactElement } from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  disabled?: boolean;
  type?: "submit" | "button";
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactElement;
  onClick?: () => void;
  flex?: string;
  style?: string;
}

export const Button = ({
  text,
  disabled,
  type = "button",
  variant = "primary",
  icon,
  onClick,
  flex = "",
  style = "",
}: Props) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${flex} ${style}`;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={buttonClasses}
    >
      {text} {icon}
    </button>
  );
};
