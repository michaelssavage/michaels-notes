import { createStitches, globalCss } from "@stitches/react";

export const { styled, css, theme, createTheme, getCssText } = createStitches({
  theme: {
    colors: {
      background: "#f5f5f5",
      header: "#ca1551",
      btnBg: "#e35103",
      extBtnBg: "#009fd1",
      extBtnBgHover: "#027a9e",
      text: "#070f06",
      hoverText: "#515151",
      underlined: "#ffe26d",
      mint: "#329a51",
      on: "#fb4d3d",
      off: "#3d89fb",

      lightenLink: "var(--lighten-link)",
      link: "var(--link)",
      card: "var(--card)",
      themeText: "var(--text)",
      icon: "var(--icon)",
      themeBackground: "var(--background)",
      themeUnderlined: "var(--underlined)",
    },
  },
});

export const lightTheme = createTheme("light-theme", {
  colors: {
    lightenLink: "#7995fa8e",
    link: "#1747e1",
    card: "#ffffff",
    themeText: "#070f06",
    icon: "#070f06",
    themeBackground: "#e6c79c",
    themeUnderlined: "#7b9ea8",
  },
});

export const darkTheme = createTheme("dark-theme", {
  colors: {
    lightenLink: "rgba(217, 242, 219, 0.2)",
    link: "#c1d2d7",
    icon: "#bbbbbb",
    themeText: "#f1f9f0",
    card: "#303433",
    themeBackground: "#523d4c",
    themeUnderlined: "#cddfa0",
  },
});

export const globalStyles = globalCss({
  ":root": {
    "--lighten-link": "$colors$lightenLink",
    "--link": "$colors$link",
    "--card": "$colors$card",
    "--text": "$colors$themeText",
    "--icon": "$colors$icon",
    "--background": "$colors$themeBackground",
    "--underlined": "$colors$themeUnderlined",
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "system-ui, sans-serif",
    backgroundColor: "$themeBackground",
    color: "$themeText",
  },
});

globalStyles();
