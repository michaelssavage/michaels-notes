import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface CoverProps {
  bg: string;
  main: string;
  contrast: string;
}

interface TechProps {
  bg: string;
  bodyContrast: string;
  main: string;
  contrast: string;
}

export const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProjectRow = styled(Link)`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
  color: var(--color-black);
  ${forPhoneOnly(css`
    grid-template-columns: 1fr;
    gap: 0.75rem;
  `)}
`;

export const ProjectCover = styled.div<CoverProps>`
  position: relative;
  max-width: 30vw;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ bg }) => bg};

  div[data-id="cover-media"] {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    box-shadow: 6px 6px 0 ${({ main }) => main};
    transition: transform 0.3s ease;
  }

  span[data-id="cover-title"] {
    font-size: clamp(1.6rem, 3vi + 0.4rem, 2.6rem);
    font-weight: 600;
    font-style: italic;
    letter-spacing: -0.05em;
    text-align: center;
    color: ${({ contrast }) => contrast};
  }

  ${ProjectRow}:hover & img {
    transform: translateY(-4px);
  }
`;

export const CoverTechnology = styled.p<TechProps>`
  font-size: 0.8rem;
  font-style: italic;
  padding: 0.2rem 0;
  overflow: hidden;
  background-color: ${({ bg }) => bg};
  color: ${({ bodyContrast }) => bodyContrast};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  ${ProjectRow}:hover & {
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

  ${ProjectRow}:hover & {
    animation-play-state: running;
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .date {
    font-size: 0.85rem;
    color: var(--color-gray600);
    margin-left: 0.5rem;
  }
`;

export const ProjectTitle = styled.h3<{ main: string }>`
  font-size: clamp(1.4rem, 1.8vi + 0.4rem, 2rem);
  font-weight: 600;
  font-style: italic;
  letter-spacing: -0.05em;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
  transition: text-decoration-color 0.3s ease;

  ${ProjectRow}:hover & {
    text-decoration-color: ${({ main }) => main};
  }
`;

export const ProjectDescription = styled.p`
  font-size: 1rem;
`;

export const DraftBadge = styled.div`
  position: absolute;
  top: 1px;
  right: 0;
  z-index: 1;
  background-color: var(--color-red300);
  color: var(--color-white);
  padding: 0.25rem 0.5rem;
`;

export const Header = styled.div`
  margin-bottom: 1rem;

  h1 {
    margin-bottom: 0.5rem;
    text-align: center;
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
