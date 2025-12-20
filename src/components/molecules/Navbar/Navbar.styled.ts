import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const Header = styled.nav`
  line-height: 1;
  padding: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;

  ${forTabletOnly(css`
    flex-direction: column;
    flex-wrap: wrap;
  `)}

  #navbar-links-container {
    font-size: clamp(1.1rem, 1rem + 0.3vw, 1.4rem);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem 1rem;
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

  &.active {
    color: ${({ theme }) => theme.blue200};
    transform: scale(1.1);
    transition:
      color 0.3s cubic-bezier(0.45, 0, 0.55, 1),
      transform 0.3s cubic-bezier(0.45, 0, 0.55, 1);
  }
`;
