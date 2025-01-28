import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const Style = styled.ul`
  font-size: 1.2rem;
  text-wrap: pretty;
`;

export const UnorderedList = (props: HTMLAttributes<HTMLUListElement>) => {
	return <Style {...props} />;
};
