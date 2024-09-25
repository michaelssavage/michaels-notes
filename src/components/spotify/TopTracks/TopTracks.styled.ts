import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Comp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const Title = styled.h2`
  display: flex;
  flex-direction: row;
  svg {
    color: ${({ theme }) => theme.colors.extBtnBg};
  }
`;

export const TrackNames = styled.div`
  padding: 0;
  ${forPhoneOnly(css`
    padding-right: 5%;
  `)}
  > li {
    display: inline;
    padding: 0;
  }
`;
