import { MyTheme } from "@/styles/abstracts/colors.styled";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import isPropValid from "@emotion/is-prop-valid";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";
import { Link } from "@tanstack/react-router";

const getPostColor = (
  theme: MyTheme,
  isExternal?: string,
  isReview?: boolean
) => {
  if (isReview) return theme.purple;
  return isExternal ? theme.blue200 : theme.red200;
};

interface CardI {
  isExternal?: string;
  isReview?: boolean;
  inView: boolean;
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
  gap: 1rem;

  ${forPhoneOnly(css`
    flex-direction: column;
    gap: 0.5rem;
  `)}

  a {
    text-decoration: none;
  }
`;

export const Title = styled(animated.h2)`
  color: ${({ theme }) => theme.black};
  text-wrap: initial;
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.26, 0.46, 0.44, 0.94);
`;

export const PostType = styled.p`
  white-space: nowrap;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.gray500};
  font-size: clamp(0.9rem, 0.7rem + 0.3vw, 1rem);
`;

export const DescriptionText = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.black};
`;

// prettier-ignore
export const Card = styled(Link, { shouldForwardProp: (prop) => isPropValid(prop) && prop !== "inView" })<CardI>`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(${({ inView }) => (inView ? 0 : "20px")});
  text-decoration: none;
  transition: opacity 0.5s ease-in-out;
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.white};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: ${({ theme }) => theme.blue} 5px 5px;
  z-index: 2;

  &:hover {
    box-shadow: ${({ theme }) => theme.blue200} 5px 5px;

    ${Title} {
      transform: translateY(-5px);
    }
  }

  ${PostType} {
    color: ${({ isExternal, isReview, theme }) => {
      return getPostColor(theme, isExternal, isReview);
    }};
  }
`;

export const DescriptionWrapper = styled(animated.div, {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !["isExpanded", "contentHeight"].includes(prop),
})<{
  isExpanded: boolean;
  contentHeight: number;
}>`
  width: 100%;
  overflow: hidden;
  max-height: ${({ isExpanded, contentHeight }) =>
    isExpanded ? `${contentHeight}px` : "1.4rem"};
  transition: max-height 0.3s ease-in-out;

  ${forPhoneOnly(css`
    font-size: 0.9rem;
  `)}
`;
