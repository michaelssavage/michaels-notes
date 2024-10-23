import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const Header = styled.header`
  line-height: 1;
  position: relative;

  nav {
    width: 100vw;
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 3rem 20%;
    text-transform: uppercase;
    font-style: italic;

    ${forPhoneOnly(css`
      padding: 2rem 10%;
    `)}
  }
`;

export const StyledLink = styled(Link)`
  z-index: 3;
  text-decoration: none;
  font-family: "Rawest";
  color: ${({ theme }) => theme.colors.text};
  transition:
    transform 0.15s cubic-bezier(0.45, 0, 0.55, 1),
    color 0.3s cubic-bezier(0.45, 0, 0.55, 1),
    background 0.3s cubic-bezier(0.45, 0, 0.55, 1),
    outline-color 0.4s cubic-bezier(0.45, 0, 0.55, 1);
  &:hover {
    color: ${({ theme }) => theme.colors.extBtnBg};
    transform: translateY(-5px);
  }

  &.active {
    color: ${({ theme }) => theme.colors.extBtnBg};
    transform: scale(1.1);
    transition:
      color 0.3s cubic-bezier(0.45, 0, 0.55, 1),
      transform 0.3s cubic-bezier(0.45, 0, 0.55, 1);
  }
`;
