import type { ReactNode } from "@tanstack/react-router";
import { memo } from "react";
import { StyledDateText } from "./Post.styled";

export interface DateTextProps {
	isExternal?: string;
	children: ReactNode;
}

export const DateText = memo(
	({ isExternal, children }: DateTextProps) => {
		return <StyledDateText isExternal={isExternal}>{children}</StyledDateText>;
	},
	(prevProps, nextProps) => {
		return (
			prevProps.isExternal === nextProps.isExternal &&
			prevProps.children === nextProps.children
		);
	},
);
