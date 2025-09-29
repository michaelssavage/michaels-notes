import { getContrastYIQ } from "@/lib/colors";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface FactContentProps {
  color?: string;
}

export const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.gray500};
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
`;

export const Comp = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    ${Title} {
      color: ${({ theme }) => theme.black};
    }
  }
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
    background-color: ${color || theme.white};
    color: ${getContrastYIQ(color || theme.white)};
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
        color: ${getContrastYIQ(color || theme.white)};
      `}
    }

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

export const FactContent = styled.p<FactContentProps>`
  font-size: 0.8rem;
  color: ${({ color = "", theme }) => getContrastYIQ(color) || theme.gray400};

  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &&& a {
    color: ${({ color = "", theme }) => getContrastYIQ(color) || theme.gray400};
  }
`;

export const ExpandButton = styled.button`
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.gray500};
  cursor: pointer;
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.black};
  }
  &:active {
    transform: translateX(-50%) scale(1.05);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const Content = styled.div`
  padding: 1rem 0;
  margin-left: 1rem;
`;

export const Player = styled.div<{ isPlaying?: boolean; color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
