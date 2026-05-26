import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const Panel = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`;

export const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 2px solid var(--color-black);
    width: 100%;
    color: var(--color-black);
    background-color: var(--color-white);
    outline: none;

    &:focus {
      border: solid 2px var(--color-green300);
    }
  }

  svg {
    position: absolute;
    left: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    background-color: transparent;
    color: var(--color-gray600);
  }
`;
