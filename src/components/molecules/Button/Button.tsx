import type { ReactElement } from "react";
import { ButtonStyled } from "./Button.styled";

export type ButtonVariants = "primary" | "secondary" | "ghost" | "pill";

export interface ButtonProps {
	text: string;
	disabled?: boolean;
	type?: "submit" | "button";
	icon?: ReactElement;
	variant?: ButtonVariants;
	onClick?: () => void;
	active?: boolean;
	selected?: boolean;
}

export const Button = ({
	text,
	disabled,
	type = "button",
	variant = "primary",
	icon,
	onClick,
	active = false,
	selected = false,
}: ButtonProps) => {
	return (
		<ButtonStyled
			disabled={disabled}
			type={type}
			onClick={onClick}
			variant={variant}
			active={active}
			selected={selected}
		>
			{text} {icon}
		</ButtonStyled>
	);
};
