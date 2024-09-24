import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <Style {...props} />;
};
