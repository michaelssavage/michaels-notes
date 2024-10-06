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
  margin: 0 -3rem;
  color: ${({ theme }) => theme.colors.secondaryText};

  svg {
    color: ${({ theme }) => theme.colors.extBtnBg};
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 70%;
  transform: translateY(-70%);
  background-color: ${({ theme }) => theme.colors.secondaryText};
  color: ${({ theme }) => theme.colors.secondaryText};
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

export const LeftScrollButton = styled(ScrollButton)`
  left: calc(-10px - 1.5rem);
`;

export const RightScrollButton = styled(ScrollButton)`
  right: calc(-10px - 1.5rem);
`;

export const ComponentWrapper = styled.div<{ spacing?: SerializedStyles }>`
  position: relative;
  ${({ spacing }) => spacing}
`;
