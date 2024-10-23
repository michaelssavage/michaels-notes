import { Wrapper } from "@/components/molecules/Picture/Picture.styled";
import { getContrastYIQ } from "@/lib/colors";
import {
	animateMusicBars,
	spinInfinitely,
} from "@/styles/abstracts/animations.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Bar = styled.span`
  display: inline-block;
  width: 4px;
  height: 100%;
`;

export const Control = styled.button`
  background: none;
  border: none;
  display: grid;
  place-items: center;
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const Content = styled.div`
  margin-left: 1rem;
`;

export const Player = styled.div<{ isPlaying?: boolean; color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Wrapper} {
    transition: all 0.3s ease;
    border: 1px solid transparent;
    border-radius: 0%;
    z-index: 2;
  }

  ${({ color, theme }) => css`
    ${Control} {
      color: ${getContrastYIQ(color || theme.colors.moon)};
    }

    ${Bar} {
      background-color: ${getContrastYIQ(color || theme.colors.moon)};
    }
  `}

  ${({ isPlaying }) =>
		isPlaying &&
		css`
      ${Wrapper} {
        border-color: black;
        border-radius: 50%;
        ${spinInfinitely()}
      }
    `}
`;

export const InteractWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-size: 0.8rem;
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
