import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface InputWrapperProps {
  isCorrect: boolean | null;
  isPartiallyCorrect: boolean;
  chars: number;
}

export const BlankContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

// prettier-ignore
export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: inline-block;
  margin: 0 0.3rem;

  input {
    min-width: 12ch;
    width: ${({ chars }) => `calc(${chars}ch + 1.5rem)`};
    height: 100%;
    padding: 0rem 1.5rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.2rem;
    border: 1px solid transparent;
    transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;

    ::placeholder {
      text-align: center; 
    }

    ${({ isCorrect, isPartiallyCorrect }) => {
      if (isCorrect === true) {
        return css`
          border: 1px solid var(--color-green300);
          background-color: var(--color-green);
        `;
      }
      if (isPartiallyCorrect) {
        return css`
          border: 1px solid var(--color-yellow300);
          background-color: var(--color-yellow300);
        `;
      }
      if (isCorrect === false) {
        return css`
          border: 1px solid var(--color-red300);
          background-color: var(--color-red);
        `;
      }
    }}
  }
`;

export const AnswerRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 0.25rem;
  row-gap: 0.25rem;
`;

export const AnswerButton = styled.button`
  margin-left: 0.25rem;
  color: var(--color-red);
  font-size: 0.8rem;
  padding: 0;
  background-color: transparent;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  height: 100%;
  padding: 0.25rem;
  cursor: pointer;

  svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    stroke-width: 3;
  }
`;

export const AnswerText = styled.p`
  margin: 0;
  color: var(--color-green);
  min-width: 0;
  flex: 1 1 auto;
  margin-bottom: 0.25rem;

  svg {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
`;
