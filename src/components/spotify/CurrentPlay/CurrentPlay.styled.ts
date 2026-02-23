import { getContrastYIQ } from "@/lib/colors";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface FactContentProps {
  color?: string;
  factColor?: string;
}

export const Title = styled.h3`
  font-weight: 500;
  color: var(--color-gray500);
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
`;

export const Comp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NowPlaying = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  gap: 0.75rem;
  padding: 0.6rem 0.8rem 1.2rem;
  border-radius: 0.4rem;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  ${({ color }) => css`
    background-color: ${color || "var(--color-white)"};
    color: ${getContrastYIQ(color || "var(--color-white)")};
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
      ${({ color }) => css`
        color: ${getContrastYIQ(color || "var(--color-white)")};
      `}
    }

    &:hover {
      transform: translateY(-5px);
    }

    ${forPhoneOnly(css`
      width: 1.5rem;
      height: 1.5rem;
    `)}
  }
`;

export const FactContent = styled.p<FactContentProps>`
  font-size: 0.9rem;
  color: ${({ factColor }) => factColor};

  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &&& a {
    color: ${({ factColor }) => factColor};
  }
`;

export const FactLink = styled.p<FactContentProps>`
  font-size: 0.9rem;
  &&& a {
    color: ${({ factColor }) => factColor};
  }
`;

export const ExpandButton = styled.button`
  position: absolute;
  bottom: -0.6rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  background-color: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-black);
  cursor: pointer;
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: var(--color-black);
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
