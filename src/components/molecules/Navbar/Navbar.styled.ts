import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const Header = styled.nav`
  line-height: 1;
  padding: 1.25rem 1.25rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.yellow};

  /* Fade-out mask for content scrolling underneath */
  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    height: 1rem;
    left: 0;
    right: 0;
    pointer-events: none;
    background: linear-gradient(
      to top,
      transparent 0%,
      ${({ theme }) => theme.yellow} 100%
    );
  }

  ${forTabletOnly(css`
    padding: 1rem 1rem 0;
    #navbar-logo-link {
      width: 3rem !important;
      height: 3rem !important;
    }
  `)}

  #navbar-links-container {
    font-size: clamp(1.1rem, 1rem + 0.3vw, 1.4rem);
    display: flex;
    align-items: center;
    padding: 0;
    text-transform: uppercase;
    font-style: italic;

    ${forTabletOnly(css`
      flex-wrap: wrap;
      text-wrap: balance;
    `)}

    ${forPhoneOnly(css`
      font-size: clamp(0.8rem, 1rem + 0.3vw, 1.1rem);
    `)}
  }
`;

export const StyledLink = styled(Link)`
  z-index: 3;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-family: "Rawest";
  color: ${({ theme }) => theme.black};
  transition:
    transform 0.15s cubic-bezier(0.45, 0, 0.55, 1),
    color 0.3s cubic-bezier(0.45, 0, 0.55, 1),
    outline-color 0.4s cubic-bezier(0.45, 0, 0.55, 1);

  &:hover {
    color: ${({ theme }) => theme.blue200};
    transform: translateY(-5px);
  }

  ${forTabletOnly(css`
    padding: 0.4rem 0.75rem;
  `)}

  &.active {
    color: ${({ theme }) => theme.blue200};
    transform: scale(1.1);
    transition:
      color 0.3s cubic-bezier(0.45, 0, 0.55, 1),
      transform 0.3s cubic-bezier(0.45, 0, 0.55, 1);
  }
`;
