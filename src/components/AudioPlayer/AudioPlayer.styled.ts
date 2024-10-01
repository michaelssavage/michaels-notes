import { Wrapper } from "@/components/Picture/Picture.styled";
import {
  animateMusicBars,
  expandAndAppear,
  spinInfinitely,
} from "@/styles/abstracts/animations.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Player = styled.div<{ isPlaying?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Wrapper} {
    transition: all 0.3s ease;
    border: 1px solid transparent;
    border-radius: 0%;
  }

  ${({ isPlaying }) =>
    isPlaying
      ? css`
          ${Wrapper} {
            border-color: black;
            border-radius: 50%;
            ${spinInfinitely()}
          }
        `
      : css`
          ${Wrapper} {
            ${expandAndAppear()}
          }
        `}
`;

export const Control = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.moon};
  display: grid;
  place-items: center;
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const BarWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  gap: 4px;
  height: 2rem;
  ${animateMusicBars()}
`;

export const Bar = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.extBtnBg};
  width: 4px;
  height: 100%;
`;
