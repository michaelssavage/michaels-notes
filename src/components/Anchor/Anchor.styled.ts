import type { AnchorVariants } from "@/components/Anchor/Anchor";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface IStyle {
  variant?: AnchorVariants;
  isExternal?: boolean;
}

export const LinkStyle = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isExternal",
})<IStyle>`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;

  ${({ variant, isExternal, theme }) => {
    switch (variant) {
      case "button":
        return css`
          padding: 4px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          gap: 4px;
          color: ${theme.colors.card};
          background-color: ${isExternal ? theme.colors.off : theme.colors.on};
          &:hover {
            background-color: ${isExternal
              ? theme.colors.extBtnBgHover
              : theme.colors.link};
          }
        `;
      case "link":
        return css`
          color: ${theme.colors.link};
          text-decoration: underline;
          text-decoration-color: ${theme.colors.link};
          position: relative;
          transition: all 0.25s;
          z-index: 4;
          &:before {
            content: "";
            z-index: -1;
            width: 100%;
            height: 0%;
            background: ${theme.colors.lightenLink};
            bottom: 0;
            left: 0;
            position: absolute;
            transition: height 0.25s;
          }
          &:hover {
            border-color: transparent;
            text-decoration: none;
            &:before {
              height: 100%;
            }
          }
        `;
      default:
        return null;
    }
  }}
`;
