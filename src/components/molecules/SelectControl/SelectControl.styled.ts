import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1rem;
`;

export const Track = styled.div`
  position: relative;
  display: flex;
  background: var(--color-white);
  border: 0.5px solid var(--color-gray600);
  border-radius: 10px;
  padding: 3px;
  gap: 0;
`;

export const Thumb = styled.div`
  position: absolute;
  top: 3px;
  bottom: 3px;
  border-radius: 8px;
  background: var(--color-green);
  border: 0.5px solid var(--color-black);
  transition:
    left 180ms cubic-bezier(0.4, 0, 0.2, 1),
    width 180ms cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 0;
`;

export const Segment = styled.button<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  border: none;
  background: transparent;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: ${(p) => (p.$active ? "500" : "400")};
  color: ${(p) => (p.$active ? "var(--color-white)" : "var(--color-gray600)")};
  cursor: pointer;
  transition:
    color 150ms ease,
    background-color 150ms ease;
  white-space: nowrap;
  user-select: none;

  &:hover {
    color: ${(p) => !p.$active && "var(--color-black)"};
  }

  ${forPhoneOnly(css`
    padding: 6px 8px;
    font-size: 11px;
  `)}
`;
