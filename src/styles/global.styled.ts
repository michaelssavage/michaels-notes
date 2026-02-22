import { pageTransitions } from "@/styles/abstracts/animations.styled";
import type { MyTheme } from "@/styles/abstracts/colors.styled";
import { fonts } from "@/styles/abstracts/fonts.styled";
import { forBreakAt } from "@/styles/abstracts/mixins.styled";
import { resetStyles } from "@/styles/abstracts/reset.styled";
import { css } from "@emotion/react";

const isInstagram =
  typeof navigator !== "undefined" && /Instagram/.test(navigator.userAgent);

export const underlineStyles = (color: string, hoverColor?: string) => css`
  background-image: linear-gradient(transparent calc(100% - 1px), ${color} 1px);
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: background-image 0.25s;
  font-weight: inherit;

  ${hoverColor &&
  css`
    &:hover {
      background-image: linear-gradient(
        transparent calc(100% - 1px),
        ${hoverColor} 1px
      );
    }
  `}
`;

export const globalStyles = (theme: MyTheme) => css`
  ${resetStyles}
  ${pageTransitions}
  ${fonts}

  body {
    margin: 0;
    padding: 0;
    font-family:
      "Mona Sans",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background-color: ${theme.yellow};
    color: ${theme.black};
    overflow-x: hidden;
    min-height: 100vh;
    transition:
      color 0.5s,
      background-color 0.5s;
    font-size: 16px;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Rawest";
    text-wrap: balance;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(1.5rem, 1.1rem + 1.2vw, 2.2rem);
  }

  h2 {
    font-size: clamp(1.2rem, 1rem + 0.9vw, 1.6rem);
  }

  h3 {
    font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.4rem);
  }

  h4 {
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }

  p {
    font-size: clamp(1rem, 0.9rem + 0.3vw, 1.1rem);
  }

  a,
  button,
  span,
  svg {
    ${!isInstagram && "filter: url(#bleed);"}
  }

  button:active {
    transform: scale(1.05);
  }

  .date {
    font-size: 0.9rem;
    font-style: italic;
    color: ${theme.gray400};
    font-weight: bold;
  }

  .underline {
    cursor: pointer;
    ${underlineStyles(theme.red200, theme.red300)}
    filter: unset;
  }

  .callout {
    background-color: ${theme.yellow};
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    width: 100%;
    margin: 0.5rem 0;
  }

  .simple-card {
    background-color: ${theme.white100};
    padding: 0.25rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }

  .popover-card {
    background-color: ${theme.yellow};
    max-width: 600px;
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid ${theme.blue200};
  }

  .three-grid-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 1rem;

    ${forBreakAt({
      breakpoint: 1200,
      styles: css`
        grid-template-columns: 1fr;
      `,
    })}
  }

  .two-grid-columns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 1rem;

    ${forBreakAt({
      breakpoint: 1200,
      styles: css`
        grid-template-columns: 1fr;
      `,
    })}
  }

  .map-popup {
    width: 200px;
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;
