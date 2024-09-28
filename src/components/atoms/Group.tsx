import styled from "@emotion/styled";
import type { ReactNode } from "@tanstack/react-router";

interface IGroup {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "flex-end" | "center";
  justify?: "flex-start" | "flex-end" | "center";
  wrap?: "wrap" | "nowrap";
  gap?: string;
  children: ReactNode;
}

const GroupStyle = styled.div<IGroup>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "row"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  align-items: ${({ align }) => align ?? "flex-start"};
  gap: ${({ gap }) => gap ?? "0.5rem"};
  flex-wrap: ${({ wrap }) => wrap ?? "nowrap"};
`;

export const Group = (props: IGroup) => {
  return <GroupStyle {...props}>{props.children}</GroupStyle>;
};
