import isPropValid from "@emotion/is-prop-valid";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";
import { Link } from "@tanstack/react-router";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";

interface DescriptionI {
	isExpanded: boolean;
	contentHeight: number;
}

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

export const Title = styled(animated.h2)`
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

export const DescriptionText = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const DescriptionWrapper = styled(animated.div)<DescriptionI>`
  width: 100%;
  overflow: hidden;
  max-height: ${({ isExpanded, contentHeight }) =>
		isExpanded ? `${contentHeight}px` : "1.4rem"};
  transition: max-height 0.3s ease-in-out;

  ${forPhoneOnly(css`
    font-size: 0.9rem;
  `)}
`;

export const Card = styled(Link, {
	shouldForwardProp: (prop) => isPropValid(prop) && prop !== "inView",
})<{ inView: boolean }>`
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
  box-shadow: #009a7b66 5px 5px;
  z-index: 2;

  &:hover {
    box-shadow: #009a7be5 5px 5px;
  }
`;
