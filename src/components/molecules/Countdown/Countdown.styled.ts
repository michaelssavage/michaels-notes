import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
  background-color: #1a1a1a;
  color: ${({ theme }) => theme.colors.btnBg};
  padding: 20px;
  border-radius: 10px;
  max-width: 100%;
`;

export const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;

  h3 {
    font-size: 4rem;
    font-weight: bold;
  }
  
  p {
    font-size: 14px;
    text-transform: uppercase;
  }

  ${forPhoneOnly(css`
    h3 {
      font-size: 2rem;
    }
    p {
      font-size: 0.8rem;
    }
  `)}
`;

export const Separator = styled.div`
  font-size: 4rem;
  font-weight: bold;
  align-self: flex-start;

  ${forPhoneOnly(css`
      font-size: 2rem;
  `)}
`;
