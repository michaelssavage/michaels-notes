import type { ButtonVariants } from "@/components/Button/Button";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IStyle {
  variant?: ButtonVariants;
  active?: boolean;
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

  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return css`
          color: ${theme.colors.card};
          background-color: ${theme.colors.mint};
          &:hover {
            background-color: ${theme.colors.extBtnBgHover};
          }
        `;
      case "secondary":
        return css`
          background-color: #6c757d;
          color: ${theme.colors.card};
        `;
      case "ghost":
        return css`
          padding: 0;
          background-color: transparent;
          color: ${theme.colors.text};
          flex-direction: row-reverse;
        `;
      default:
        return null;
    }
  }}

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
`;
