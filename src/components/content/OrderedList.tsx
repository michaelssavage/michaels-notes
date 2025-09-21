import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.ol`
  font-size: 1.2rem;
  text-wrap: pretty;
`;

export const OrderedList = (props: HTMLAttributes<HTMLOListElement>) => {
  return <Style {...props} />;
};
