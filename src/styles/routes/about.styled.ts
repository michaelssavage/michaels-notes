import {
	forBreakAt,
	forPhoneOnly,
	forTabletOnly,
} from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 9rem);
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

export const Section = styled(motion.div)`
  min-height: calc(100vh - 9rem);
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;

  ${forPhoneOnly(css`
    align-items: flex-start;
  `)}
`;

export const Paragraph = styled.div`
  font-size: 1.5rem;
  width: 60%;
  text-align: center;

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

export const selfieStyle = css`
  overflow: hidden;
  border-top-left-radius: 5rem;
  border-top-right-radius: 5rem;

  img {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  ${forBreakAt({
		breakpoint: 900,
		styles: css`
      width: 60%;
    `,
	})}
`;

export const plantbassdStyle = css`
  border-radius: 1rem;
  transition:
    transform 0.3s ease,
    border-radius 0.3s ease;

  ${forBreakAt({
		breakpoint: 900,
		styles: css`
      width: 60%;
    `,
	})}

  &:hover {
    transform: rotate(15deg);
    border-radius: 0;
  }
`;
