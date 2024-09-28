import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface IContainer {
  margin?: string;
  pb?: string;
}

type ICol = {
  size?: "md" | "sm";
  gap?: string;
};

interface IGroup {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "flex-end" | "center";
  justify?: "flex-start" | "flex-end" | "center";
  gap?: string;
}

export const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin ?? "0 20% 2rem"};
  padding-bottom: ${({ pb }) => pb ?? "1rem"};

  ${forPhoneOnly(css`
    margin: 0 5% 2rem;
  `)}
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const getColStyle = ({ size }: ICol) => {
  switch (size) {
    case "md":
      return css`
        flex: 1 1 calc(50% - 0.25rem);

        ${forTabletOnly(css`
          flex: 1 1 calc(100% - 0.25rem);
        `)}
      `;
    default:
      return css`
        flex: 1 1 calc(33.33% - 0.25rem);

        ${forPhoneOnly(css`
          flex: 1 1 calc(50% - 0.25rem);
        `)}

        ${forTabletOnly(css`
          flex: 1 1 calc(100% - 0.25rem);
        `)}
      `;
  }
};

export const Col = styled.div<ICol>`
  ${({ size, gap }) => getColStyle({ size, gap })}
`;

export const MotionCol = styled(motion.div)<ICol>`
  ${({ size, gap }) => getColStyle({ size, gap })}
`;

export const Group = (props?: IGroup) => css`
  display: flex;
  flex-direction: ${props?.direction ?? "row"};
  justify-content: ${props?.justify ?? "flex-start"};
  align-items: ${props?.align ?? "flex-start"};
  gap: ${props?.gap ?? "0.5rem"};
`;
