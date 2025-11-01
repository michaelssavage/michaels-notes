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

export const Page = styled.section`
  margin: 2rem 0;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
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
    gap: 1rem;
    grid-template-columns: repeat(1, minmax(180px, 1fr));
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

export const Card = styled(Link)`
  display: grid;
  overflow: hidden;
  will-change: transform;
  border-radius: 0.2rem;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white};
  height: 100%;

  border-radius: 0.4rem;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
`;

export const CardTitle = styled.h3<{ main: string; contrast: string }>`
  padding: clamp(1rem, 1.2vi + 0.15rem, 1.6rem) 0.5rem;
  font-size: clamp(0.8rem, 1.4vi + 0.1rem, 1rem);
  background-color: ${({ main }) => main};
  color: ${({ contrast }) => contrast};
  font-weight: 400;
  display: flex;
  align-items: center;

  ${forTabletOnly(css`
    font-size: clamp(0.8rem, 1vi + 0.31rem, 0.95rem);
  `)}

  ${forPhoneOnly(css`
    font-size: 1rem;
  `)}
`;

export const CardBody = styled.div<{ bg: string; contrast: string }>`
  padding: clamp(1rem, 1.2vi + 0.15rem, 1.6rem) 0.5rem;
  font-size: clamp(0.8rem, 0.8vi + 0.1rem, 1rem);
  background-color: ${({ bg }) => bg};
  color: ${({ contrast }) => contrast};

  ${forTabletOnly(css`
    font-size: clamp(0.72rem, 0.5vi + 0.45rem, 0.9rem);
  `)}

  ${forPhoneOnly(css`
    font-size: 0.9rem;
  `)}
`;

export const Header = styled.div`
  margin-bottom: 1rem;

  h1 {
    margin-bottom: 0.5rem;
  }

  ${forPhoneOnly(css`
    margin: 0 5% 2rem;
  `)}

  p[data-id="filter-projects"] {
    color: ${({ theme }) => theme.gray600};
  }
`;

// slug
export const Article = styled.article<{ height?: string }>`
  margin: 2rem 10%;
  min-height: ${({ height }) => height};
`;

export const Tags = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.black};
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
  margin-bottom: -1rem;
  font-weight: bold;

  display: flex;
  align-items: center;
`;
