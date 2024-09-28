import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Card = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.75);
  z-index: 2;

  ${forPhoneOnly(css`
    width: 90%;
  `)}
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  ${forPhoneOnly(css`
    flex-direction: column;
    gap: 0.5rem;
  `)}

  a {
    text-decoration: none;
  }
`;

export const Title = styled(motion.h2)`
  font-size: 1.2rem;
  will-change: transform;
  color: ${({ theme }) => theme.colors.text};
  text-wrap: initial;
`;

export const DateText = styled.p`
  white-space: nowrap;
  font-style: italic;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.header};
  font-weight: bold;
`;

export const DescriptionWrapper = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  ${forPhoneOnly(css`
    font-size: 0.9rem;
  `)}
`;

export const DescriptionText = styled.p`
  margin: 0;
  padding: 0;
`;
