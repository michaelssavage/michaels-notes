import { css } from "@emotion/react";
import nudicaFont from "@/assets/fonts/nudica.woff2";
import rawestFont from "@/assets/fonts/rawest.woff2";

export const fonts = css`
  @font-face {
    font-family: "Rawest";
    src: url(${rawestFont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Nudica";
    src: url(${nudicaFont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;
