import nudicaFont from "@/assets/nudica.woff2";
import rawestFont from "@/assets/rawest.woff2";
import { css } from "@emotion/react";

export const fonts = css`
  @font-face {
    font-family: "Rawest";
    src: url(${rawestFont}) format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Nudica";
    src: url(${nudicaFont}) format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;
