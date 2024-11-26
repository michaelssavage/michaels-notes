import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const TextareaContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TextareaWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  resize: vertical;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
`;

export const ToggleContainer = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 0.8rem;
  border-radius: 8px;
  border: 1px solid black;
  cursor: pointer;
  color: ${({ checked, theme }) => (checked ? theme.colors.moon : "#000000")};
  background-color: ${({ checked, theme }) => (checked ? theme.colors.mint : "transparent")};

  label {
    cursor: pointer;
  }
`;

export const copyButtonStyles = css`
  position: absolute;
  top: 1.75rem;
  right: 0.25rem;
  padding: 0.25rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: #c9c7c7;
    transform: scale(1.1);
  }
`;

export const viewMoreButtonStyles = css`
  background-color: #24292e;
  flex-direction: row-reverse;
  padding: 10px 20px;
  border-radius: 4px;
  text-wrap: nowrap;
  svg {
    stroke: #fff;
  }

  &:hover {
    color: #2b3137;
    background-color:	#fafbfc;
    svg {
      stroke: #2b3137;
    }
  }
`;
