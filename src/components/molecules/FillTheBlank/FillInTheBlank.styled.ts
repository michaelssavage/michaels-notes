import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BlankContainer = styled.div`
  margin-bottom: 1rem;
`;

// prettier-ignore
export const InputWrapper = styled.div<{ isCorrect: boolean | null; chars: number; }>`
  position: relative;
  display: inline-block;
  margin: 0 0.3rem;

  input {
    min-width: 12ch;
    width: ${({ chars }) => `${chars}ch`};
    height: 100%;
    padding: 0rem 1.5rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.2rem;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;

    ${({ isCorrect, theme }) => {
      if (isCorrect === true) {
        return css`
          border: 1px solid ${theme.green300};
          background-color: ${theme.green};
        `;
      } else if (isCorrect === false) {
        return css`
          border: 1px solid ${theme.red300};
          background-color: ${theme.red};
        `;
      }
    }}
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  height: 100%;
  padding: 0.25rem;

  svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    stroke-width: 3;
  }
`;
