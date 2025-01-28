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
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  gap: 2px;
  transition: all 0.35s;
  border-radius: 5px;
  width: fit-content;

  svg {
    flex-shrink: 0;
    width: 0.9rem;
    height: 0.9rem;
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
            box-shadow: inset 0 0 0 2em ${theme.colors.link};
            border-color: ${theme.colors.link};
            color: #fff;
            text-decoration: none;
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
