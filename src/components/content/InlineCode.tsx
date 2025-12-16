import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Inline = styled.code`
  font-family: monospace;
  color: ${({ theme }) => theme.code};
  background-color: ${({ theme }) => theme.white100};
  font-size: 1rem;
  font-weight: 500;
`;

export const InlineCode = (props: HTMLAttributes<HTMLElement>) => {
  return <Inline {...props} />;
};
