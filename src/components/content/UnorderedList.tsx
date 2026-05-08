import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.ul`
  font-size: clamp(1rem, 0.9rem + 0.2vw, 1.1rem);
  text-wrap: pretty;
`;

export const UnorderedList = (props: HTMLAttributes<HTMLUListElement>) => {
  return <Style {...props} />;
};
