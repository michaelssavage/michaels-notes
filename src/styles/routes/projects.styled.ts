import { getContrastYIQ } from "@/lib/colors";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface ICard {
	main: string;
	bg: string;
}

export const CardWrapper = styled.div`
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    z-index: 20;
  }
`;

export const Card = styled(Link)<ICard>`
  display: grid;
  overflow: hidden;
  will-change: transform;
  border-radius: 0.2rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.card};

  border-radius: 0.4rem;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  ${CardWrapper}:hover & {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  span {
    padding: clamp(1rem, 1.5vi + 0.15rem, 2rem) 0.5rem;
  }

  span:first-of-type {
    font-size: clamp(0.9rem, 1.5vi + 0.15rem, 1.5rem);
    background-color: ${({ main }) => main};
    color: ${({ main }) => getContrastYIQ(main)};
  }

  span:last-of-type {
    font-size: clamp(0.8rem, 0.9vi + 0.15rem, 1.2rem);
    background-color: ${({ bg }) => bg};
    color: ${({ bg }) => getContrastYIQ(bg)};
  }

  ${forTabletOnly(css`
    span:first-of-type {
      font-size: clamp(0.8rem, 1vi + 0.31rem, 1.13rem);
    }

    span:last-of-type {
      font-size: clamp(0.72rem, 0.5vi + 0.45rem, 0.9rem);
    }
  `)}

  ${forPhoneOnly(css`
    span:first-of-type {
      font-size: 1.5rem;
    }

    span:last-of-type {
      font-size: 1.2rem;
    }
  `)}
`;

export const ProjectGrid = css`
  perspective: 1000px;

  &:hover ${CardWrapper}:not(:hover) {
    filter: grayscale(50%) blur(2px);
    opacity: 0.7;
    transition: all 0.3s ease;
  }
`;

export const Header = styled.div`
  margin-bottom: 1rem;
  p {
    margin-bottom: 0.5rem;
  }
  ${forPhoneOnly(css`
    margin: 0 5% 2rem;
  `)}
`;

// slug

export const Article = styled(motion.article)`
  margin: 2rem auto;
  width: 50%;

  ${forPhoneOnly(css`
    width: 90%;
  `)}
`;

export const Tags = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
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

export const ProjectImage = styled(motion.div)`
  width: 100%;
  height: auto;
  object-fit: cover;
  will-change: transform;
`;

export const SpotifyContent = styled.div`
  margin: 1rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Title = styled(motion.h1)<ICard>`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 0.5rem;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  font-weight: bold;
  background-color: ${({ main }) => main};
  color: ${({ main }) => getContrastYIQ(main)};
  will-change: transform;

  display: flex;
  align-items: center;
`;
