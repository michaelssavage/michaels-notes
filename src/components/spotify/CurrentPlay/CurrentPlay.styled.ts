import { getContrastYIQ } from "@/lib/colors";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  ${({ color, theme }) => css`
    background-color: ${color || theme.colors.moon};
    color: ${getContrastYIQ(color || theme.colors.moon)};
  `}

  a {
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
