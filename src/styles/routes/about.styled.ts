import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 12rem);
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

export const Section = styled(motion.div)`
  min-height: calc(60vh - 12rem);
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
`;

export const Paragraph = styled.div`
  font-size: 1.5rem;
  width: 60%;
  text-align: center;
  padding: 2rem;

  ${forTabletOnly(css`
    width: 85%;
    font-size: 1.2rem;
  `)}

  ${forPhoneOnly(css`
    width: 95%;
    font-size: 1rem;
  `)}
`;

export const ArrowContainer = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const Paragraphs = styled.div`
  font-size: 1.2rem;

  p {
    margin-bottom: 1rem;
  }
`;

export const imageWrapperStyle = css`
  overflow: hidden;
  border-top-left-radius: 5rem;
  border-top-right-radius: 5rem;
  min-width: 12rem;
  max-width: 12rem;

  img {
    aspect-ratio: unset;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  ${forPhoneOnly(css`
    img {
      width: 240px;
      min-width: 140px;
    }
  `)}
`;
