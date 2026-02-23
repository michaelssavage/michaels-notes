import { type SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";

export const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  svg[aria-label="left icon"],
  svg[aria-label="right icon"] {
    position: absolute;
    top: calc(0.9rem + 50%); // 0.6rem padding + 50% of ItemContainer
    transform: translateY(-50%);
    color: var(--color-black);
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  svg[aria-label="left icon"] {
    left: calc(-1rem);
  }
  svg[aria-label="right icon"] {
    right: calc(-1rem);
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.6rem 0;
`;

export const Title = styled.h3`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  margin: 0 -1rem;

  color: var(--color-gray400);

  svg {
    color: var(--color-blue);
  }
`;

export const ComponentWrapper = styled.div<{ $spacing?: SerializedStyles }>`
  position: relative;
  ${({ $spacing }) =>
    $spacing ??
    css`
      margin: 0 0.5rem;
    `};
`;
