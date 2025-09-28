import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  padding: 1rem 0;
  margin: 0 1rem;

  ${forTabletOnly(css`
    grid-template-columns: repeat(1, minmax(0, 1fr));
  `)}
`;
