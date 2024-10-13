import { type SerializedStyles, css } from "@emotion/react";

export const forBelowOnly = (
  breakpoint: number,
  styles: SerializedStyles | string
) => css`
  @media (max-width: ${breakpoint}px) {
    ${styles}
  }
`;

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
