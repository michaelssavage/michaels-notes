import {
  forBreakAt,
  forPhoneOnly,
  forTabletOnly,
} from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface CardWrapperProps {
  $shouldDim: boolean | null;
}

interface TechProps {
  bg: string;
  bodyContrast: string;
  main: string;
  contrast: string;
}

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  gap: 4px;

  ${forBreakAt({
    breakpoint: 1000,
    styles: css`
      grid-template-columns: repeat(3, minmax(180px, 1fr));
    `,
  })}

  ${forTabletOnly(css`
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  `)}

  ${forPhoneOnly(css`
    gap: 0.5rem;
    grid-template-columns: repeat(1, 1fr);
  `)}
`;

export const CardWrapper = styled.div<CardWrapperProps>`
  position: relative;
  transition: transform 0.3s ease;
  height: 100%;

  ${({ $shouldDim }) =>
    $shouldDim &&
    css`
      opacity: 0.5;
      filter: blur(3px);
    `};
`;

export const DraftBadge = styled.div`
  position: absolute;
  top: 1px;
  right: 0;
  z-index: 1;
  background-color: var(--color-red300);
  color: var(--color-white);
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
`;

export const Card = styled(Link)`
  display: grid;
  grid-template-rows: 1fr auto;
  overflow: hidden;
  will-change: transform;
  border-radius: 0.4rem;
  text-decoration: none;
  color: var(--color-black);
  background-color: var(--color-white);
  height: 100%;
`;

export const CardBody = styled.div<{ bg: string; contrast: string }>`
  padding: clamp(1rem, 1.2vi + 0.15rem, 1.6rem) 0.5rem;
  background-color: ${({ bg }) => bg};
  color: ${({ contrast }) => contrast};
`;

export const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 1.8vi + 0.3rem, 1.7rem);
  font-weight: 600;
  display: flex;
  align-items: center;
  letter-spacing: -0.05em;
  font-style: italic;
`;

export const CardDescription = styled.p`
  margin-top: 0.5rem;
  font-size: clamp(1rem, 0.8vi + 0.1rem, 1rem);
`;

export const CardTechnology = styled.p<TechProps>`
  font-size: 0.8rem;
  background-color: ${({ bg }) => bg};
  color: ${({ bodyContrast }) => bodyContrast};
  font-style: italic;
  overflow: hidden;
  margin-left: -1rem;

  ${CardWrapper}:hover & {
    background-color: ${({ main }) => main};
    color: ${({ contrast }) => contrast};
  }
`;

export const TechTrack = styled.span`
  display: inline-flex;
  white-space: nowrap;

  @keyframes scrollRight {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }

  animation: scrollRight 10s linear infinite;
  animation-play-state: paused;

  ${CardWrapper}:hover & {
    animation-play-state: running;
  }
`;

export const Header = styled.div`
  margin-bottom: 1rem;

  h1 {
    margin-bottom: 0.5rem;
  }

  ${forPhoneOnly(css`
    margin-bottom: 1rem;
  `)}

  p[data-id="filter-projects"] {
    color: var(--color-gray600);
  }
`;

export const Tags = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-black);
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Paths = styled.div`
  ${forTabletOnly(css`
    left: -9rem;
  `)}

  ${forPhoneOnly(css`
    width: 90%;
    position: static;
  `)}
`;

export const SpotifyContent = styled.div`
  margin: 1rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-top: -1rem;
  font-weight: bold;

  display: flex;
  align-items: center;
`;
