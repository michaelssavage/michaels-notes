import { forBreakAt, forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface ICard {
	index: number;
	active: number;
}

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

export const Card = styled(Link)<ICard>`
  position: absolute;
  width: 75%;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.highlight};
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-out;
  ${({ index, active }) => {
		const isActive = index === active;
		const diff = index - active;
		const translateX = isActive ? 0 : `${diff * 50}px`;
		const translateZ = isActive ? 0 : `${Math.abs(diff) * -100}px`;
		const rotateY = isActive ? 0 : `${diff * 10}deg`;
		const scale = isActive ? 1 : 1 - Math.abs(diff) * 0.1;
		const opacity = isActive ? 1 : 1 - Math.abs(diff) * 0.2;
		return `
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

  ${forBreakAt({
		breakpoint: 900,
		styles: css`
      height: 100%;
      aspect-ratio: 0.56;
      width: auto;
    `,
	})}
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
		isActive ? theme.colors.button : "transparent"};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.moon : "#070f06")};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isActive, theme }) =>
			isActive ? theme.colors.extBtnBg : "#e2e6ea"};
  }

  ${forPhoneOnly(css`
    padding: 0.5rem 1rem;
  `)}
`;
