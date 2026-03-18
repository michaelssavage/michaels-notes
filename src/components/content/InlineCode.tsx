import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Inline = styled.code`
  font-family: monospace;
  color: var(--color-code);
  font-size: 1rem;
  font-weight: 600;

  pre & {
    color: var(--color-white);
  }
`;

export const InlineCode = (props: HTMLAttributes<HTMLElement>) => {
  return <Inline {...props} />;
};
