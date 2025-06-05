import type { SerializedStyles } from "@emotion/react";
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
    top: 70%;
    transform: translateY(-70%);
    color: ${({ theme }) => theme.colors.secondaryText};
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }

    &:focus {
      outline: none;
    }
  }

  svg[aria-label="left icon"] {
    left: calc(-10px - 1.5rem);

  }
  svg[aria-label="right icon"] {
    right: calc(-10px - 1.5rem);
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 10px;
`;

export const Title = styled.h3`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  margin: 0 -1rem;

  color: ${({ theme }) => theme.colors.secondaryText};

  svg {
    color: ${({ theme }) => theme.colors.extBtnBg};
  }
`;

export const ComponentWrapper = styled.div<{ spacing?: SerializedStyles }>`
  position: relative;
  ${({ spacing }) => spacing}
`;
