import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const PreStyle = styled.pre`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const Pre = (props: HTMLAttributes<HTMLPreElement>) => {
  return <PreStyle {...props} />;
};
