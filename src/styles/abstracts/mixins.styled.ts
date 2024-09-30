import { type SerializedStyles, css } from "@emotion/react";

export const forTabletOnly = (styles: SerializedStyles | string) => css`
  @media (max-width: 768px) {
    ${styles}
  }
`;

export const forPhoneOnly = (styles: SerializedStyles | string) => css`
  @media (max-width: 599px) {
    ${styles}
  }
`;
