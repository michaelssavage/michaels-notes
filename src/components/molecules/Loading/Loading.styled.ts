import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;

  div {
    display: flex;
    gap: 8px;
  }
`;

export const Dot = styled.div<{ delay: number }>`
  width: 12px;
  height: 12px;
  background-color: #3b82f6;
  border-radius: 50%;
  animation: ${bounce} 0.6s infinite;
  animation-delay: ${({ delay }) => delay}s;
`;
