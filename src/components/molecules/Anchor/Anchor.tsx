import type { SerializedStyles } from "@emotion/react";
import { type ReactElement, memo } from "react";
import { ExternalLinkIcon } from "../../icons";
import { LinkStyle } from "./Anchor.styled";

export type AnchorVariants = "button" | "link" | "text";

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
				isExternal={isExternal}
				rel={isExternal ? "noopener noreferrer" : undefined}
				target={isExternal ? "_blank" : undefined}
				css={style}
			>
				{text ? text : link} {isExternal && !icon ? <ExternalLinkIcon /> : icon}
			</LinkStyle>
		);
	},
);
