import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const TextareaWrapper = styled.div`
  flex: 1;
  position: relative;
  min-width: 210px;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
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

export const AboutSection = styled.div`
  margin: 2rem auto;
  max-width: 800px;

  p {
    margin: 1rem 0;
    font-size: 1.2rem;
  }
`;

export const copyButtonStyles = css`
  position: absolute;
  top: 1.75rem;
  right: 0.25rem;
  padding: 0.25rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray400);

  &:hover {
    background-color: var(--color-gray);
  }
`;

export const DragBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  h1 {
    color: #fff;
    font-size: 2rem;
    text-align: center;
  }
`;
