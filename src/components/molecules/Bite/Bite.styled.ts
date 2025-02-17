import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Year = styled.p`
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  transform: rotate(90deg);
  margin-right: -1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.isBite};
`;

export const Text = styled.p`
  list-style-type: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: 100%;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.card};
  transition: 0.3s ease-in-out;
  box-shadow: #009a7b66 5px 5px;
  ${forPhoneOnly(css`
    font-size: 1rem;
  `)}
`;

export const BiteItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.25rem 0;

  &:hover {
    ${Year} {
      transform: rotate(0deg);
      margin-right: 0;
      margin-left: 0.5rem;
    }
    ${Text} {
      box-shadow: #009a7be5 5px 5px;
    }
  }
`;
