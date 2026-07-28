import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const Header = styled.nav`
  z-index: 10;
  width: 100%;
  line-height: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  height: 6rem;
  background-color: var(--color-yellow);
  border-bottom: 1px solid var(--color-black);

  > a {
    position: relative;
    height: calc(100% + 1px);
  }

  > a:not(:last-of-type) {
    border-right: 1px solid var(--color-black);
  }

  #navbar-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 80px;
      height: 80px;
      transition: transform 0.2s ease-in-out;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  ${forTabletOnly(css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    padding: 1rem;

    > a {
      height: auto;
    }

    > a:not(:last-of-type) {
      border-right: none;
    }

    #navbar-logo-link img {
      width: 48px;
      height: 48px;
    }
  `)}
`;

export const NavCount = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: block;
  font-size: 0.85rem;
`;

export const MobileNavCount = styled.span`
  font-size: 0.85rem;
`;

export const StyledLink = styled(Link)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-family: "Rawest";
  font-size: clamp(1.1rem, 1rem + 0.3vw, 1.4rem);
  text-transform: uppercase;
  font-style: italic;
  color: var(--color-black);
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0;
    background-color: var(--color-black);
    transition: height 0.225s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    height: 5px;
  }

  &.active {
    color: var(--color-yellow);
    pointer-events: none;
  }

  &.active::before {
    height: 100%;
  }

  ${forTabletOnly(css`
    display: none;
  `)}
`;

export const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  padding: 0.5rem;
  margin-left: auto;
  cursor: pointer;
  color: var(--color-black);

  ${forTabletOnly(css`
    display: flex;
    align-items: center;
    justify-content: center;
  `)}
`;

export const MobileNavOverlay = styled.div<{ $open: boolean }>`
  display: none;

  ${forTabletOnly(css`
    display: block;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    overflow-y: auto;
    background-color: var(--color-black);
    transition:
      transform 0.225s cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0.225s;
  `)}

  ${({ $open }) =>
    forTabletOnly(css`
      transform: translateY(${$open ? "0" : "100%"});
      visibility: ${$open ? "visible" : "hidden"};
      ${$open &&
      css`
        transition-duration: 0.15s;
      `}
    `)}
`;

export const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 2rem 4rem;
`;

export const MobileStyledLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  text-decoration: none;
  font-family: "Rawest";
  font-size: clamp(1.8rem, 6vw, 2.6rem);
  text-transform: uppercase;
  font-style: italic;
  color: var(--color-yellow);
  transition: color 0.2s ease;
  line-height: 1;

  &:hover,
  &.active {
    text-decoration: underline;
  }
`;

export const AdminMenu = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 20;

  ${forTabletOnly(css`
    position: static;
    margin-left: auto;
  `)}
`;

export const AdminUserIcon = styled.div`
  color: var(--color-black);
`;

export const AdminContent = styled.div`
  background-color: var(--color-yellow);
  padding: 1rem;
  border: 1px solid var(--color-black);
`;
