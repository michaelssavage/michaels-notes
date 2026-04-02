import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Inline = styled.code`
  font-family: monospace;
  color: var(--color-white);
  background-color: var(--color-black);
  font-size: 1rem;
  border-radius: 0.3em;
  padding: 2px 5px 3px;
  white-space: nowrap;
  font-weight: 600;

  pre & {
    color: var(--color-white);
    font-size: 0.9rem;
  }
`;

export const InlineCode = (props: HTMLAttributes<HTMLElement>) => {
  return <Inline {...props} />;
};
