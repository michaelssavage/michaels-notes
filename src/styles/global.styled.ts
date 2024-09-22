/** @jsxImportSource @emotion/react */
import { pageTransitions } from "@/styles/abstracts/animations.styled";
import type { MyTheme } from "@/styles/abstracts/colors.styled";
import { resetStyles } from "@/styles/abstracts/reset.styled";
import { css } from "@emotion/react";

export const globalStyles = (theme: MyTheme) => css`
  ${resetStyles}
  ${pageTransitions}

  body {
    margin: 0;
    padding: 0;
    font-family: "Inter, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
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
    text-wrap: balance;
  }

  .container {
    display: flex;
    flex-direction: column;
    margin: 0 15% 2rem;
    padding-bottom: 1rem;

    @media (max-width: 599px) {
      margin: 0 5% 2rem;
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .col {
    flex: 1 1 calc(33.33% - 0.25rem);
    padding: 1rem 0.25rem;

    @media (max-width: 768px) {
      width: 50%;
    }

    @media (max-width: 599px) {
      width: 100%;
    }
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
    color: ${theme.colors.hoverText};
    font-weight: bold;
  }

  .underline {
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
`;
