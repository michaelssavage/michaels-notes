import { forBreakAt } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface ICard {
  $isActive: boolean;
}

export const Text = styled.div`
  font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.4rem);
  flex: 1;
`;

export const Movie = styled.span<ICard>`
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-green400)" : "var(--color-green)"};
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: ${({ $isActive }) =>
      $isActive ? "var(--color-green400)" : "var(--color-green400)"};
  }
`;

export const MovieContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
`;

export const Card = styled(Link)`
  position: relative;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--slide-height);
  user-select: none;
  flex-shrink: 0;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-out;

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
  margin: 0.5rem 0;
  gap: 0.5rem;
`;

export const Button = styled.button<{ isActive: boolean }>`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? "var(--color-green300)" : "var(--color-gray600)"};
  color: var(--color-white);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-green400);
  }
`;
