import {
  slideInAnimation,
  spinInfinitely,
} from "@/styles/abstracts/animations.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const feedbackBtnStyles = css`
  flex-direction: row-reverse;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  svg {
    stroke: var(--color-white);
  }
`;

export const FeedbackCard = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-gray400);
  border-radius: 8px;
  border-radius: 8px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 400px;
  padding: 16px;
`;

export const Card = styled.div`
  position: fixed;
  bottom: 24px;
  z-index: 9999;
  background: var(--color-white);
  border: 1px solid var(--color-gray400);
  border-radius: 8px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 320px;
  padding: 16px;
  ${slideInAnimation("8px", "vertical")};
`;

export const IpAddress = styled.p`
  white-space: nowrap;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const HeartContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: var(--color-green);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  svg {
    transition: transform 0.2s;
    stroke: var(--color-white);
  }

  &:hover {
    background: var(--color-green200);
    svg {
      transform: rotate(15deg);
    }
  }
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    font-size: clamp(0.7rem, 0.6rem + 0.3vw, 1rem);
  }
`;

export const ErrorMessage = styled.p`
  color: var(--color-red300);
  margin: 6px 0;
  font-size: clamp(0.7rem, 0.6rem + 0.3vw, 1rem);
`;

export const SpinningIcon = styled.span`
  display: inline-block;
  margin-right: 8px;
  ${spinInfinitely("1s")};
`;
