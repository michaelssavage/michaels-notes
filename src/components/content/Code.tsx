import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.code`
  &:not(pre > code) {
    font-family: monospace;
    color: ${({ theme }) => theme.code};
    background-color: ${({ theme }) => theme.white100};
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const Code = (props: HTMLAttributes<HTMLElement>) => {
  return <Style {...props} />;
};
