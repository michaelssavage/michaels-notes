import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Year = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  transform: rotate(-90deg);
  margin-left: -1rem;
  color: var(--color-yellow300);
`;

export const Text = styled.div`
  padding: 0.5rem 1rem;
  font-weight: 500;
  width: 100%;
  background-color: var(--color-white);
  transition: 0.3s ease-in-out;
  box-shadow: var(--color-blue) 5px 5px;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  p[data-id="date"] {
    font-style: italic;
    color: var(--color-gray500);
    font-size: clamp(0.9rem, 0.7rem + 0.3vw, 1rem);
    margin-left: auto;
    white-space: nowrap;
  }

  ${forPhoneOnly(css`
    gap: 0.2rem;
    flex-direction: column-reverse;
  `)}
`;

export const BiteItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    ${Year} {
      transform: rotate(0deg);
      margin-left: 0;
      margin-right: 0.5rem;
    }
    ${Text} {
      box-shadow: var(--color-blue200) 5px 5px;
    }
  }
`;
