import { slideInAnimation } from "@/styles/abstracts/animations.styled";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const AnimatedLine = styled(motion.div)`
  margin-top: 1rem;
  border-bottom: 1rem solid ${({ theme }) => theme.colors.mint};
  z-index: -1;
  margin-right: auto;
  will-change: transform;
  ${slideInAnimation("100px", "horizontal", "0.75s")}
`;
