import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MenuContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 15rem;
  left: 5rem;
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

  #back-to-target {
    font-size: 1.1rem;
    font-style: italic;
  }

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
    top: 5rem;
    left: 1rem;
    right: 1rem;
    width: fit-content;
  `)}
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
