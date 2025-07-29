import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";
import { ArrowDown } from "@/components/icons";
import { hoverVertically } from "@/styles/abstracts/animations.styled";
import {
	forBreakAt,
	forPhoneOnly,
	forTabletOnly,
} from "@/styles/abstracts/mixins.styled";

export const Content = styled.div`
  position: relative;
`;

export const Arrow = styled(ArrowDown)`
  ${hoverVertically()}
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 5%;
  cursor: pointer;
`;

export const Section = styled(animated.section)<{
	main?: string;
	bg?: string;
}>`
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  color: ${({ main, theme }) => main || theme.colors.text};
  background-color: ${({ bg }) => bg || "transparent"};

  &:first-of-type {
    height: 85vh;
    
    ${forPhoneOnly(css`
      height: 80vh;
    `)}
  }
`;

export const Paragraph = styled.div<{ text?: string }>`
  font-size: 1.5rem;
  width: 60%;

  ${forTabletOnly(css`
    width: 85%;
    font-size: 1.2rem;
  `)}

  ${forPhoneOnly(css`
    width: 95%;
    font-size: 1rem;
  `)}
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
  max-width: 300px;


  img {
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
    transform-origin: 30% top;

    &:hover {
      transform: scale(2);
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

export const breakpoint = forBreakAt({
	breakpoint: 900,
	styles: css`
    flex-direction: column;
  `,
});
