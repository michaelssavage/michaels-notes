import { ArrowDown } from "@/components/icons";
import { hoverVertically } from "@/styles/abstracts/animations.styled";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  margin-bottom: 2rem;
  position: relative;
  h1 {
    font-size: clamp(4rem, 0.5692rem + 8.5vw, 13.75rem);
    text-align: center;
    margin: 0 2rem;
    color: ${({ theme }) => theme.colors.icon};
    span {
      color: ${({ theme }) => theme.colors.header};
    }
  }
  ${forPhoneOnly(css`
    h1 {
      font-size: clamp(2rem, 0.5692rem + 8.5vw, 13.75rem);
    }
  `)}
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin: 0 1rem;
  svg {
    width: 7rem;
    height: 7rem;
  }

  ${forPhoneOnly(css`
    margin: 0 10%;
  `)}
`;

export const Arrow = styled(ArrowDown)`
  ${hoverVertically()}
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 5%;
`;
