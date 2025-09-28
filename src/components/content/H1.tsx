import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.black};
`;

export const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <Style {...props} />;
};
