import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

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

interface IContainer {
  margin?: string;
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
  margin: ${({ margin }) => margin ?? "0 10% 1rem"};
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;

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
