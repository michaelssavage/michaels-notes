import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.h2`
  text-transform: uppercase;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.black};
`;

export const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <Style {...props} />;
};
