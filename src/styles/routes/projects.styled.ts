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
  font-size: 1.2rem;
  padding: 2rem 0.5rem;
  transition: opacity 0.25s;
  color: ${({ theme }) => theme.colors.moon};
  text-shadow: 3px 2px 4px #191919;
  height: 100%;

  span:first-of-type {
    font-size: 1.5rem;
  }

  ${forPhoneOnly(css`
    font-size: 1rem;
  `)}
`;

export const Wrap = styled(Link)`
  display: grid;
  overflow: hidden;
  will-change: transform;
  border-radius: 0.2rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

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
