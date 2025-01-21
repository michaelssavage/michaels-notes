import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.p`
  font-size: 1.2rem;
  text-wrap: pretty;
`;

export const Paragraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
	return <Style {...props} />;
};
