import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Card = styled(Link)<{ inView: boolean }>`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(${({ inView }) => (inView ? 0 : "20px")});
  text-decoration: none;
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;

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

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverCard};
  }
`;

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 5rem;
  }
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
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledDateText = styled.p<{ isExternal?: string }>`
  white-space: nowrap;
  font-style: italic;
  font-size: 0.85rem;
  color: ${({ isExternal, theme }) =>
		isExternal ? theme.colors.off : theme.colors.on};
  font-weight: bold;
`;

export const DescriptionWrapper = styled(motion.div)<{
	isExpanded: boolean;
	contentHeight: number;
}>`
  width: 100%;
  overflow: hidden;
  max-height: ${({ isExpanded, contentHeight }) =>
		isExpanded ? `${contentHeight}px` : "1.4rem"};
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0.7)};
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  ${forPhoneOnly(css`
    font-size: 0.9rem;
  `)}
`;

export const DescriptionText = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
`;
