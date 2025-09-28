import type { AnchorVariants } from "@/components/molecules/Anchor/Anchor";
import { type CSSObject, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface IStyle {
  variant?: AnchorVariants;
  isExternal?: boolean;
  style?: CSSObject;
}

export const LinkStyle = styled(Link)<IStyle>`
  text-decoration: none;
  transition: all 0.25s;
  border-radius: 5px;
  width: fit-content;
  position: relative;

  &:hover {
    svg {
      opacity: 1;
    }
  }

  svg {
    position: absolute;
    top: 0;
    right: -1.2rem;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    opacity: 0;
    transition: opacity 0.25s;
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case "button":
        return css`
          padding: 4px;
          border: 1px solid;
          border-color: ${theme.blue200};
          color: ${theme.blue200};
          &:hover {
            box-shadow: inset 0 0 0 2rem ${theme.blue200};
            color: ${theme.white};
          }
        `;
      case "link":
        return css`
          padding: 0;
          text-decoration: underline;
          border: none;
          margin-right: 2px;
          color: ${theme.blue200};
          &:hover {
            color: ${theme.blue300};
          }
        `;
      case "text":
        return css`
          color: ${theme.black};
        `;
      default:
        return null;
    }
  }}

  ${({ style }) => style || {}}
`;
