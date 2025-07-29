import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { getContrastYIQ } from "@/lib/colors";

interface FactContentProps {
	color?: string;
}

export const Comp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const NowPlaying = styled.div<{ color: string }>`
  display: flex;
  position: relative;
  flex-direction: column;

  gap: 0.75rem;
  padding: 0.6rem 0.8rem 1.2rem;
  border-radius: 0.4rem;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  ${({ color, theme }) => css`
    background-color: ${color || theme.colors.moon};
    color: ${getContrastYIQ(color || theme.colors.moon)};
  `}

  a[id="external-track-url"] {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 3rem;
    height: 3rem;
    transition: transform 0.3s ease;

    svg {
      width: 100%;
      height: 100%;
      ${({ color, theme }) => css`
        color: ${getContrastYIQ(color || theme.colors.moon)};
      `}
    }

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

export const Box = styled(motion.div)`
  display: relative;
  display: flex;
  flex-direction: column;
`;

export const FactContent = styled.p<FactContentProps>`
  font-size: 0.8rem;
  color: ${({ color = "", theme }) => getContrastYIQ(color) || theme.colors.secondaryText};

  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const ExpandButton = styled.button`
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  cursor: pointer;
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;

  &:hover{
  background-color: ${({ theme }) => theme.colors.hoverCard};
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 0.3s ease;

    :hover {
      transform: scale(1.1);
    }
  }
`;
