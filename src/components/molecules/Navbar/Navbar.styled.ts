import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";

export const Header = styled.header`
  line-height: 1;
  padding: 3rem 2rem 1rem;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  ${forTabletOnly(css`
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
  `)}

  nav {
    font-size: 1.4rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    padding: 0;
    text-transform: uppercase;
    font-style: italic;

    ${forTabletOnly(css`
      flex-wrap: wrap;
      text-wrap: balance;
    `)}

    ${forPhoneOnly(css`
      font-size: 1.1rem;
      gap: 0.5rem;
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

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin: 0 1rem;

  ${forPhoneOnly(css`
    margin: 0 0.2rem;
    min-width: unset;
    min-height: unset;
    flex-wrap: wrap;
    gap: 0.5rem;
  `)}

  svg {
    width: 3rem;
    height: 3rem;
    min-width: 2rem;
    min-height: 2rem;

    ${forPhoneOnly(css`
      width: 2rem;
      height: 2rem;
      min-width: 1rem;
      min-height: 1rem;
    `)}
  }
`;
