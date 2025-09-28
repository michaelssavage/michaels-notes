import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.blockquote`
  color: ${({ theme }) => theme.gray600};
  border-left: 4px solid ${({ theme }) => theme.gray600};
  margin: 0.5rem 10px;
  padding: 0.5rem 10px;

  p {
    display: inline;
  }
`;

export const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <Style {...props} />;
};
