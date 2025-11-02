import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import type { ButtonVariants } from "./Button";

interface IStyle {
  variant?: ButtonVariants;
  active?: boolean;
  selected?: boolean;
  styles?: SerializedStyles;
}

export const ButtonStyled = styled.button<IStyle>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  text-wrap: nowrap;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  ${({ variant, theme, selected }) => {
    switch (variant) {
      case "primary":
        return css`
          color: ${theme.white};
          background-color: ${theme.green};
          &:hover {
            background-color: ${theme.green200};
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.gray400};
          color: ${theme.white};
          &:hover {
            background-color: ${theme.gray500};
          }
        `;
      case "ghost":
        return css`
          padding: 0;
          background-color: transparent;
          color: ${theme.black};
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
          &:hover {
            color: ${theme.blue200};
          }
        `;
      case "pill":
        return css`
          background-color: ${selected ? theme.green : theme.white};
          color: ${selected ? theme.black : theme.gray600};
          border: 2px solid ${theme.black};
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          &:hover {
            background-color: ${selected ? theme.green300 : theme.white};
            color: ${theme.black};
          }
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            &:hover {
              background-color: ${theme.gray400};
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
    !active &&
    css`
      svg {
        stroke-width: 1;
        stroke: grey;
        fill: transparent;
      }
    `}

  ${({ styles }) => styles}
`;
