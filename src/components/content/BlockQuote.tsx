import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.blockquote`
  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.white};
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
