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

  ${forPhoneOnly(css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `)}
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
  border: 1px solid var(--color-black);
  padding-bottom: 1rem;
  border-top: none;
`;

export const Paragraph = styled.div<{ text?: string }>`
  width: 70%;
  text-wrap: balance;

  p,
  a {
    font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.4rem);
  }

  ${forTabletOnly(css`
    width: 85%;

    p {
      text-align: center;
    }
  `)}

  ${forPhoneOnly(css`
    width: 95%;
  `)}
`;

export const Opening = styled.p`
  margin-left: -2rem;
  z-index: 1;

  ${forBreakAt({
    breakpoint: 900,
    styles: css`
      margin-left: 0;
      margin-top: 1rem;
    `,
  })}
`;

export const CustomSites = styled.p`
  text-align: center;
`;

export const selfieStyle = css`
  max-width: 300px;
  transition:
    transform 0.3s ease,
    border-radius 0.3s ease;

  &:hover {
    transform: rotate(-15deg);
    border-radius: 1rem;
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

export const videoStyle = css`
  min-width: 250px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    border-radius 0.3s ease;

  &:hover {
    transform: rotate(-15deg);
    border-radius: 1rem;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  ${forBreakAt({
    breakpoint: 900,
    styles: css`
      max-width: 60%;
      min-width: unset;
    `,
  })}
`;

export const plantbassdStyle = css`
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
    border-radius: 1rem;
  }
`;

export const breakpoint = forBreakAt({
  breakpoint: 900,
  styles: css`
    flex-direction: column;
  `,
});

export const reverseBreak = forBreakAt({
  breakpoint: 900,
  styles: css`
    flex-direction: column-reverse;
  `,
});
