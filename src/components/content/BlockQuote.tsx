import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.blockquote`
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white};
  border-left: 4px solid ${({ theme }) => theme.gray600};
  margin-bottom: 1rem;
  padding: 0.5rem 10px;

  p {
    display: inline;
  }
`;

export const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <Style {...props} />;
};
