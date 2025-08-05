import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import type { MyTheme } from "@/styles/abstracts/colors.styled";
import { forBreakAt, forPhoneOnly } from "@/styles/abstracts/mixins.styled";

interface ICard {
	diff: number;
	$isActive: boolean;
}

export const anchorStyles = (
	isActive: boolean,
	colors: MyTheme["colors"],
) => css`
  color: ${isActive ? colors.section3c : "#dccad0"};
  text-decoration: ${isActive ? "underline" : "none"};
  transition: color 0.2s;

  &:hover {
    color: ${isActive ? colors.headerBg : colors.buttonLink};
  }
`;

export const Movie = styled.span<Pick<ICard, "$isActive">>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.section3c : "#aeb1ea")};
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.headerBg : theme.colors.buttonLink)};
  }
`;

export const StackContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;

  ${forBreakAt({
		breakpoint: 900,
		styles: css`
      height: 300px;
    `,
	})}

  ${forPhoneOnly(css`
    height: 150px;
  `)}
`;

export const CardStack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled(Link, {
	shouldForwardProp: (prop) => prop !== "$isActive",
})<ICard>`
  position: absolute;
  width: 75%;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.highlight};
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-out;

  ${({ $isActive, diff }) => {
		const translateX = $isActive ? 0 : `${diff * 50}px`;
		const translateZ = $isActive ? 0 : `${Math.abs(diff) * -100}px`;
		const rotateY = $isActive ? 0 : `${diff * 10}deg`;
		const scale = $isActive ? 1 : 1 - Math.abs(diff) * 0.1;
		const opacity = $isActive ? 1 : 1 - Math.abs(diff) * 0.2;
		return css`
      transform: translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale});
      opacity: ${opacity};
      z-index: ${10 - Math.abs(diff)};
    `;
	}}

  img {
    border-radius: 0.4rem;
    width: 100%;
    height: 100%;
  }

  &:hover {
    img {
      filter: blur(2px);
    }
  }

  ${forBreakAt({
		breakpoint: 900,
		styles: css`
      height: 100%;
      aspect-ratio: 0.56;
      width: auto;
    `,
	})}
`;

export const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  pointer-events: none;
  border-radius: 16px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export const HoverText = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 1rem;
  margin: 0.5rem 0;

  ${forPhoneOnly(css`
    line-height: 0.5rem;
  `)}
`;

export const Button = styled.button<{ isActive: boolean }>`
  padding: 0.25rem 1.25rem;
  border: none;
  background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.link : "transparent"};
  color: ${({ theme }) => theme.colors.moon};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isActive, theme }) =>
			isActive ? theme.colors.headerBg : theme.colors.buttonLink};
  }

  ${forPhoneOnly(css`
    padding: 0.5rem 1rem;
  `)}
`;
