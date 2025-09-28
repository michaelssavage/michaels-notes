import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const MenuContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 9rem;
  left: 2rem;
  z-index: 12;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  font-size: 0.7rem;
  background-color: ${({ theme }) => theme.white};
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 0.5rem;
  cursor: ${({ open }) => (open ? "default" : "pointer")};

  svg {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  &:hover {
    svg {
      transform: rotate(-90deg);
    }
  }

  ${forTabletOnly(css`
    padding: 0.5rem;
    margin-bottom: 1rem;
    top: 7rem;
    position: static;
    width: fit-content;
  `)}
`;

export const PageLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: underline;
  font-style: italic;
  transition: all 0.35s;

  color: ${({ theme }) => theme.black};
  &:hover {
    color: ${({ theme }) => theme.blue300};
  }
`;

export const Sidebar = styled.ol`
  padding: 0 0.75rem 0.75rem;
  font-size: 1rem;
  list-style: decimal inside none;
  margin-top: 0.5rem;

  li {
    margin-bottom: 0.2rem;
  }

  ${forPhoneOnly(css`
    padding: 0 1rem 0.75rem;
  `)}
`;
