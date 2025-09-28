import { shimmerAnimation } from "@/styles/abstracts/animations.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.figure`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  figcaption {
    font-size: 0.9rem;
    opacity: 0.8;
    background-color: ${({ theme }) => theme.white};
    padding: 0 0.25rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const NotFound = styled.img`
  background-color: ${({ theme }) => theme.white};
  width: 120px;
  border-radius: 0.4rem;
`;

export const ImageStyle = styled.img<{ loaded: boolean; ar?: string }>`
  aspect-ratio: ${({ ar }) => ar};
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${({ loaded }) =>
    loaded &&
    css`
      opacity: 1;
    `}
`;

export const Placeholder = styled.div<{ ar?: string }>`
  grid-area: 1 / 1;
  border-radius: 0.4rem;
  width: 100%;
  height: auto;
  aspect-ratio: ${({ ar }) => ar};
  background: linear-gradient(90deg, #e0e0e0 25%, #c5c5c5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  ${shimmerAnimation()}
`;
