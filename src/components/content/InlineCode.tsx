import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Inline = styled.code`
  font-family: monospace;
  color: var(--color-code);
  background-color: var(--color-white100);
  font-size: 1rem;
  font-weight: 500;
`;

export const InlineCode = (props: HTMLAttributes<HTMLElement>) => {
  return <Inline {...props} />;
};
