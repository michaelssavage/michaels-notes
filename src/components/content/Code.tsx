import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.code`
  &:not(pre > code) {
    font-family: monospace;
    color: ${({ theme }) => theme.colors.code};
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

export const Code = (props: HTMLAttributes<HTMLElement>) => {
	return <Style {...props} />;
};
