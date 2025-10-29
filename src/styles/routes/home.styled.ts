import { ArrowDown } from "@/components/icons";
import { hoverVertically } from "@/styles/abstracts/animations.styled";
import {
  forBreakAt,
  forPhoneOnly,
  forTabletOnly,
} from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";

export const Content = styled.div`
  position: relative;
`;

export const anchorStyle = (color: string, hoverColor: string) => css`
  color: ${color};

  &:hover {
    color: ${hoverColor};
  }
`;

export const Arrow = styled(ArrowDown)`
  ${hoverVertically()}
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 5%;
  cursor: pointer;
`;

export const Section = styled(animated.section)`
  min-height: calc(60vh);
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
`;

export const Paragraph = styled.div<{ text?: string }>`
  width: 70%;

  p {
    font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.4rem);
  }

  ${forTabletOnly(css`
    width: 85%;
  `)}

  ${forPhoneOnly(css`
    width: 95%;
  `)}
`;

export const selfieStyle = css`
  border-radius: 1rem;
  max-width: 300px;
  transition:
    transform 0.3s ease,
    border-radius 0.3s ease;

  &:hover {
    transform: rotate(-15deg);
    border-radius: 0;
  }

  img {
    object-fit: cover;
  }

  ${forBreakAt({
    breakpoint: 900,
    styles: css`
      width: 60%;
    `,
  })}
`;

export const plantbassdStyle = css`
  border-radius: 1rem;
  max-width: 300px;
  transition:
    transform 0.3s ease,
    border-radius 0.3s ease;

  ${forBreakAt({
    breakpoint: 900,
    styles: css`
      width: 60%;
    `,
  })}

  &:hover {
    transform: rotate(15deg);
    border-radius: 0;
  }
`;

export const breakpoint = forBreakAt({
  breakpoint: 900,
  styles: css`
    flex-direction: column;
  `,
});
