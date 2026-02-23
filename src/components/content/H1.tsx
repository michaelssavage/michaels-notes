import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.h1`
  text-transform: uppercase;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: var(--color-black);
`;

export const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <Style {...props} />;
};
