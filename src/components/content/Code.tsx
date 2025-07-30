import styled from "@emotion/styled";
import { darken } from "polished";
import type { HTMLAttributes } from "react";

const Style = styled.code`
  &:not(pre > code) {
    font-family: monospace;
    color: ${({ theme }) => theme.colors.code};
    background-color: ${({ theme }) => darken(0.06, theme.colors.background)};
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const Code = (props: HTMLAttributes<HTMLElement>) => {
	return <Style {...props} />;
};
