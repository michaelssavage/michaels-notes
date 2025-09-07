import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";

interface IGroup {
	direction?: "row" | "column" | "row-reverse" | "column-reverse";
	align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
	justify?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	gap?: string;
}

interface IContainer extends IGroup {
	maxWidth?: string;
	padding?: string;
}

type IRow = {
	gap?: [string, string];
	flex?: string;
};

type ICol = {
	size?: "md" | "sm";
	gap?: string;
	flex?: string;
};

export const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth ?? "60%"};
  padding: ${({ padding }) => padding ?? "0 0 1rem"};
  align-items: ${({ align }) => align ?? "stretch"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  gap: ${({ gap }) => gap ?? "0"};

  ${forPhoneOnly(css`
    max-width: 90%;
  `)}
`;

export const Row = styled.div<IRow>`
  display: flex;
  flex-wrap: wrap;
  flex: ${({ flex }) => flex ?? "0 0 auto"};

  gap: ${({ gap }) => css`
    margin: 0 -${gap?.[0] ?? "0.5rem"};

    ${Col} {
      padding: 0 ${gap?.[0] ?? "0.5rem"};
      margin-bottom: ${gap?.[1] ?? "0.5rem"};
    }
  `};
`;

export const Col = styled.div<ICol>`
  height: auto;
  width: 100%;
  ${({ size }) => {
		switch (size) {
			case "sm":
				return css`
          flex: 0 0 25%;
          max-width: 25%;

          ${forTabletOnly(css`
            flex: 0 0 50%;
            max-width: 50%;
          `)}

          ${forPhoneOnly(css`
            flex: 0 0 100%;
            max-width: 100%;
          `)}
        `;
			case "md":
				return css`
          flex: 0 0 50%;
          max-width: 50%;

          ${forTabletOnly(css`
            flex: 0 0 100%;
            max-width: 100%;
          `)}
        `;
			default:
				return css`
          flex: 0 0 25%;
          max-width: 25%;

          ${forTabletOnly(css`
            flex: 0 0 50%;
            max-width: 50%;
          `)}

          ${forPhoneOnly(css`
            flex: 0 0 100%;
            max-width: 100%;
          `)}
        `;
		}
	}}
`;

export const Group = (props?: IGroup) => css`
  display: flex;
  flex-direction: ${props?.direction ?? "row"};
  justify-content: ${props?.justify ?? "flex-start"};
  align-items: ${props?.align ?? "flex-start"};
  gap: ${props?.gap ?? "0.5rem"};
`;
