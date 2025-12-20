import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding: 0 1rem;
  max-width: 1000px;
  margin: 3rem auto;
  gap: 1rem;

  ${forPhoneOnly(css`
    gap: 0.5rem;
  `)}
`;
