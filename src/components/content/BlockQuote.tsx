import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.blockquote`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  border-left: 10px solid #ccc;
  margin: 0.5rem 10px;
  padding: 0.5rem 10px;

  p {
    display: inline;
  }
`;

export const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <Style {...props} />;
};
