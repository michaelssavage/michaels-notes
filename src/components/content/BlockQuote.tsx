import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.blockquote`
  color: var(--color-black);
  background-color: var(--color-white);
  border: 1px solid var(--color-blue200);
  margin-bottom: 1rem;
  padding: 0.5rem 10px;
  box-shadow: var(--color-blue200) 5px 5px;

  p {
    display: inline;
  }
`;

export const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <Style {...props} />;
};
