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
  margin: 0 1rem;
  width: 50%;
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
`;

export const DateText = styled.p`
  font-style: italic;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.header};
  font-weight: bold;
`;

export const Description = styled.p<{ isFirst: boolean }>`
  width: 100%;

  ${forPhoneOnly(css`
    font-size: 0.9rem;
  `)}

  ${({ isFirst }) =>
    !isFirst &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-height: 1.5rem;
      opacity: 1;
      transition:
        max-height 0.2s ease-out,
        opacity 0.2s ease-out;

      ${Card}:hover & {
        max-height: 100px;
        opacity: 1;
        white-space: normal;
        text-overflow: initial;
        transition:
          max-height 0.25s ease-in,
          opacity 0.25s ease-in;
      }
    `}
`;
