import styles from "./Button.module.scss";

interface Props {
  disabled?: boolean;
  type?: "submit" | "button";
  text: string;
  variant: string;
  onClick?: () => void;
}

export const Button = ({
  disabled,
  type = "button",
  text,
  variant,
  onClick,
}: Props) => {
  const buttonClasses = `${styles.button} ${styles[variant]}`;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={buttonClasses}
    >
      {text}
    </button>
  );
};
