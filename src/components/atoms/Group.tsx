import type { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import type { ReactNode } from "@tanstack/react-router";

interface IGroup {
	direction?: "row" | "column" | "row-reverse" | "column-reverse";
	align?: "flex-start" | "flex-end" | "center";
	justify?: "flex-start" | "flex-end" | "center" | "space-between";
	wrap?: "wrap" | "nowrap";
	gap?: string;
	css?: SerializedStyles;
	children: ReactNode;
}

const GroupStyle = styled.div<Omit<IGroup, "css">>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "row"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  align-items: ${({ align }) => align ?? "flex-start"};
  gap: ${({ gap }) => gap ?? "0.5rem"};
  flex-wrap: ${({ wrap }) => wrap ?? "nowrap"};
`;

export const Group = ({ css: cssStyle, ...props }: IGroup) => {
	return (
		<GroupStyle {...props} css={cssStyle}>
			{props.children}
		</GroupStyle>
	);
};
