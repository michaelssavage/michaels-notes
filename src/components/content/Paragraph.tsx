import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.p`
  text-wrap: pretty;
  margin-bottom: 1rem;
`;

export const Paragraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
  return <Style {...props} />;
};
