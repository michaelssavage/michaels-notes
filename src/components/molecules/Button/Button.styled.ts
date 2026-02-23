import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import type { ButtonVariants } from "./Button";

interface IStyle {
  variant?: ButtonVariants;
  active?: boolean;
  selected?: boolean;
  styles?: SerializedStyles;
}

export const buttonWithIconStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
`;

export const ButtonStyled = styled.button<IStyle>`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  text-wrap: nowrap;

  ${({ variant, selected }) => {
    switch (variant) {
      case "primary":
        return css`
          color: var(--color-white);
          background-color: var(--color-green);
          &:hover {
            background-color: var(--color-green200);
          }
        `;
      case "secondary":
        return css`
          border: 1px solid var(--color-gray400);
          background-color: var(--color-white);
          color: var(--color-gray400);
          &:hover {
            border-color: var(--color-black);
            color: var(--color-black);
          }
        `;
      case "ghost":
        return css`
          padding: 0;
          background-color: transparent;
          color: var(--color-black);
          flex-direction: row-reverse;
          box-shadow: none;
        `;
      case "link":
        return css`
          padding: 0;
          display: inline;
          background-color: transparent;
          text-wrap: wrap;
          white-space: normal;
          word-wrap: break-word;
          box-shadow: none;
          color: var(--color-blue200);
          &:hover {
            color: var(--color-blue300);
          }
        `;
      case "pill":
        return css`
          background-color: ${selected
            ? "var(--color-green)"
            : "var(--color-white)"};
          color: ${selected ? "var(--color-black)" : "var(--color-gray600)"};
          border: 2px solid var(--color-black);
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          &:hover {
            background-color: ${selected
              ? "var(--color-green300)"
              : "var(--color-white)"};
            color: var(--color-black);
          }
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            &:hover {
              background-color: var(--color-gray400);
            }
          }
        `;
      default:
        return null;
    }
  }}

  svg {
    flex-shrink: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ active }) =>
    active === false &&
    css`
      svg {
        stroke-width: 1;
        stroke: grey;
        fill: transparent;
      }
    `}

  ${({ styles }) => styles}
`;
