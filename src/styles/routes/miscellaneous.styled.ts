import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { forBreakAt, forPhoneOnly } from "@/styles/abstracts/mixins.styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
  padding: 1rem 0;
  margin: 0 18vw;

  ${forBreakAt({
    breakpoint: 1000,
    styles: css`
      margin: 0 10vw;
    `,
  })}

  ${forPhoneOnly(css`
    margin: 0 5vw;
  `)}
`;
