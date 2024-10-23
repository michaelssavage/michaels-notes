import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BitePanel = styled.section`
  z-index: 2;
  margin: 2rem auto 4rem;
  width: 60%;
  ${forPhoneOnly(css`
    width: 90%;
  `)}
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  ul {
    margin: 0 0 2rem 0;
    padding: 0;
  }
`;

export const Year = styled.p`
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  transform: rotate(-90deg);
  margin-left: -1rem;
`;

export const Text = styled.p`
  list-style-type: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: 100%;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.colors.card};
  box-shadow:
    #009a7b66 5px 5px,
    #009a7b4d 10px 10px,
    #009a7b33 15px 15px,
    #009a7b1a 20px 20px;
  transition: 0.3s ease-in-out;
  ${forPhoneOnly(css`
    font-size: 1rem;
  `)}
`;

export const AnimatedBite = styled.li<{ inView: boolean }>`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(${({ inView }) => (inView ? 0 : "20px")});
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0rem;
  margin-bottom: 2rem;

  &:hover {
    ${Year} {
      transform: rotate(0deg);
      margin-left: 0;
      margin-right: 0.25rem;
    }
    ${Text} {
      box-shadow: #009a7b66 5px 5px;
    }
  }
`;
