import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const Navigator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  position: fixed;
  top: 9rem;
  left: 2rem;
  ${forPhoneOnly(css`
    position: static;
  `)}

  svg {
    margin-bottom: -0.25rem;
  }
`;

export const PageLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  font-style: italic;
  ${forTabletOnly(css`
    left: -9rem;
  `)}

  ${forPhoneOnly(css`
    width: auto;
    position: static;
  `)}

  color: ${({ theme, color }) => (color ? color : theme.colors.mint)};
  &:hover {
    color: ${({ theme }) => theme.colors.extBtnBgHover};
  }
`;
