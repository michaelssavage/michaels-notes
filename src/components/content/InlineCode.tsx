import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Inline = styled.code`
  font-family: monospace;
  color: var(--color-white);
  background-color: var(--color-black);
  font-size: clamp(1rem, 0.9rem + 0.2vw, 1.1rem);
  padding: 2px 5px 3px;
  white-space: nowrap;
  font-weight: 600;

  pre & {
    display: block;
    color: var(--color-white);
    font-size: 0.9rem;
    white-space: pre;
    overflow-x: auto;
  }
`;

export const InlineCode = (props: HTMLAttributes<HTMLElement>) => {
  return <Inline {...props} />;
};
