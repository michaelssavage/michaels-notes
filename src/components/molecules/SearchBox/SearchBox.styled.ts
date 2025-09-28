import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const Panel = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: ${({ theme }) => theme.gray600};
  }

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
    border: 2px solid ${({ theme }) => theme.black};
    border-radius: 9999px;
    width: 100%;
    color: ${({ theme }) => theme.black};
    background-color: ${({ theme }) => theme.yellow};

    &:focus {
      outline: solid 2px ${({ theme }) => theme.green300};
    }
  }

  svg {
    position: absolute;
    left: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    background-color: transparent;
    color: ${({ theme }) => theme.gray600};
  }
`;
