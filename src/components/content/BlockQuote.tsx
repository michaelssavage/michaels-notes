import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.blockquote`
  color: var(--color-black);
  background-color: var(--color-yellow100);
  border-left: 4px solid var(--color-yellow300);
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 0.5rem 10px;

  p {
    display: inline;
  }
`;

export const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <Style {...props} />;
};
