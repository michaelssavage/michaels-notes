import type { AnchorVariants } from "@/components/molecules/Anchor/Anchor";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

interface IStyle {
	variant?: AnchorVariants;
	isExternal?: boolean;
}

export const LinkStyle = styled(Link)<IStyle>`
  text-decoration: none;
  transition: all 0.35s;
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
          border-color: ${theme.colors.button};
          color: ${theme.colors.button};
          &:hover {
            box-shadow: inset 0 0 0 2em ${theme.colors.link};
            border-color: ${theme.colors.link};
            color: #fff;
          }
        `;
			case "link":
				return css`
          padding: 0;
          text-decoration: underline;
          border: none;
          color: ${theme.colors.button};
          &:hover {
            color: ${theme.colors.link};
          }
        `;
			case "text":
				return css`
          color: ${theme.colors.text};
        `;
			default:
				return null;
		}
	}}
`;
