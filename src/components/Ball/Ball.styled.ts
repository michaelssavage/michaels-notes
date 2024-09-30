import { expandAndAppear } from "@/styles/abstracts/animations.styled";
import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const BallWrapper = styled.div`
  > * {
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    overflow: hidden;
    transform-origin: 50% 50%;
  }
`;

export const Clickable = styled(motion.button)`
  background: transparent;
  pointer-events: auto;
  z-index: 1;
`;

export const Circle = styled(motion.div)`
  z-index: -2;
  overflow-x: hidden;
  filter: blur(20px);

  ${expandAndAppear()}

  ${forTabletOnly(css`
    visibility: hidden;
  `)}
`;
