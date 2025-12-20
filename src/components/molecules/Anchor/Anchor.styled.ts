import type { AnchorVariants } from "@/components/molecules/Anchor/Anchor";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { underlineStyles } from "@/styles/global.styled";
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

  svg {
    width: 1.2rem;
    height: 1.2rem;
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
          ${underlineStyles(theme.blue200, theme.blue300)}
          border: none;
          margin-right: 2px;
          color: ${theme.blue200};
          &:hover {
            color: ${theme.blue300};
          }
        `;
      case "header":
        return css`
          display: inline-block;
          font-weight: 600;
          color: ${theme.black};
          transition: transform 0.15s cubic-bezier(0.26, 0.46, 0.44, 0.94);
          text-decoration: underline;

          &:hover {
            transform: scale(1.02);
          }
        `;
      case "footer":
        return css`
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: ${theme.gray600};

          svg {
            width: 3rem;
            height: 3rem;

            ${forPhoneOnly(css`
              width: 2.5rem;
              height: 2.5rem;
            `)}
          }

          &:hover {
            transform: scale(1.02);
            color: ${theme.black};
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
