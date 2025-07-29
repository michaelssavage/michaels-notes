import { css } from "@emotion/react";
import { pageTransitions } from "@/styles/abstracts/animations.styled";
import type { MyTheme } from "@/styles/abstracts/colors.styled";
import { fonts } from "@/styles/abstracts/fonts.styled";
import { resetStyles } from "@/styles/abstracts/reset.styled";

export const globalStyles = (theme: MyTheme) => css`
  ${resetStyles}
  ${pageTransitions}
  ${fonts}

  body {
    margin: 0;
    padding: 0;
    font-family:
      "Nudica",
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
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
  }

  .icon-link {
    color: ${theme.colors.icon};

    svg {
      &:hover {
        transform: scale(1.08);
      }
    }
  }

  .date {
    font-size: 0.9rem;
    font-style: italic;
    color: ${theme.colors.secondaryText};
    font-weight: bold;
  }

  .underline {
    cursor: pointer;
    background-image: linear-gradient(
      transparent calc(100% - 0.15rem),
      ${theme.colors.underlined} 0.15rem
    );
    background-position: left bottom 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline;
    font-weight: inherit;
    transition: background-size 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }

  .callout {
    background-color: ${theme.colors.card};
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    width: 100%;
    margin: 0.5rem 0;
  }

  .popover-card {
    background-color: ${theme.colors.card};
    max-width: 600px;
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid  ${theme.colors.off};
  }
`;
