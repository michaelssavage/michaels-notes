import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const View = styled.p`
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  padding: clamp(1rem, 1.5vi + 0.15rem, 2rem) 0.5rem;
  transition: opacity 0.25s;
  color: ${({ theme }) => theme.colors.moon};
  text-shadow: 3px 2px 4px #191919;
  height: 100%;

  span:first-of-type {
    font-size: clamp(0.9rem, 1.5vi + 0.15rem, 1.5rem);
  }

  span:last-of-type {
    font-size: clamp(0.8rem, 0.9vi + 0.15rem, 1.2rem);
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

export const Card = styled(Link)`
  display: grid;
  overflow: hidden;
  will-change: transform;
  border-radius: 0.2rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);

  & > * {
    grid-column: 1;
    grid-row: 1;
  }

  img {
    cursor: pointer;
    will-change: transform;
    transition:
      filter 0.25s ease,
      transform 0.25s ease;
  }

  &:hover {
    img {
      filter: blur(5px) brightness(0.5);
      -webkit-filter: blur(5px) brightness(0.5);
      transform: scale(1.05);
    }

    ${View} {
      opacity: 1;
    }
  }
`;

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

export const Header = styled.div`
  margin-bottom: 1rem;
  ${forPhoneOnly(css`
    margin: 0 5% 2rem;
  `)}
`;
