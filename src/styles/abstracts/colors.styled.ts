const common = {
  header: "#ca1551",
  btnBg: "#e35103",
  extBtnBg: "#009fd1",
  extBtnBgHover: "#027a9e",
  hoverText: "#515151",
  mint: "#329a51",
  on: "#fb4d3d",
  off: "#3d89fb",
  moon: "#f0f0f0",
  sun: "#ffe26d",
  code: "#d63384",
  secondary: "#6c757d",
  highlight: "#009fd199",
};

export const lightTheme = {
  colors: {
    ...common,
    toggle: "#070f06",
    lightenLink: "#7995fa8e",
    link: "#1747e1",
    card: "#ffffff",
    text: "#070f06",
    secondaryText: "#333",
    icon: "#070f06",
    background: "#e6c79c",
    underlined: "#7b9ea8",
  },
};

export const darkTheme = {
  colors: {
    ...common,
    toggle: "#009fd1",
    lightenLink: "rgba(217, 242, 219, 0.2)",
    link: "#75deb1",
    icon: "#bbbbbb",
    text: "#f1f9f0",
    secondaryText: "#D8E0D8",
    card: "#303433",
    background: "#523d4c",
    underlined: "#cddfa0",
  },
};

export type MyTheme = typeof lightTheme;

// const projects = [
//   { main: "#FC766AFF", bg: "#5B84B1FF" },
//   { main: "#755139FF", bg: "#F2EDD7FF" },
//   { main: "#2C5F2D", bg: "#97BC62FF" },
//   { main: "#00203FFF", bg: "#ADEFD1FF" },
//   { main: "#606060FF", bg: "#D6ED17FF" },
//   { main: "#5F4B8BFF", bg: "#E69A8DFF" },
//   { main: "#42EADDFF", bg: "#CDB599FF" },
//   { main: "#435E55FF", bg: "#D64161FF" },
//   { main: "#D198C5FF", bg: "#E0C568FF" },
// ];
