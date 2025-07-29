import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";

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
  background-color: ${({ theme }) => theme.colors.moon};
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 0.5rem;
  cursor: ${({ open }) => (open ? "default" : "pointer")};

  svg {
    cursor: pointer;
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

  color: ${({ theme }) => theme.colors.link};
  &:hover {
    color: ${({ theme }) => theme.colors.header};
  }
`;

export const Sidebar = styled.ol`
  padding: 0 0.75rem 0.75rem;
  font-size: 1rem;
  font-size: 0.9rem;
  list-style: decimal inside none;
  li {
    margin-bottom: 0.2rem;
  }
  
  ${forPhoneOnly(css`
    padding: 0 1rem 0.75rem;
  `)}
`;
