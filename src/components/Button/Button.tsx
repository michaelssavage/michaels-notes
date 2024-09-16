import type { CSSProperties, ReactElement } from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  disabled?: boolean;
  type?: "submit" | "button";
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactElement;
  onClick?: () => void;
  style?: string;
}

export const Button = ({
  text,
  disabled,
  type = "button",
  variant = "primary",
  icon,
  onClick,
  style = "",
}: Props) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${style}`;

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
