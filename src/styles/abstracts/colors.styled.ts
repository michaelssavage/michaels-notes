const common = {
  header: "#ca1551",
  btnBg: "#e35103",
  extBtnBg: "#009fd1",
  extBtnBgHover: "#027a9e",
  hoverText: "#515151",
  mint: "#329a51",
  on: "#fb4d3d",
  off: "#3d89fb",
  moon: "#ffffff",
  sun: "#ffe26d",
};

export const lightTheme = {
  colors: {
    ...common,
    toggle: "#070f06",
    lightenLink: "#7995fa8e",
    link: "#1747e1",
    card: "#ffffff",
    text: "#070f06",
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
    link: "#c1d2d7",
    icon: "#bbbbbb",
    text: "#f1f9f0",
    card: "#303433",
    background: "#523d4c",
    underlined: "#cddfa0",
  },
};

export type MyTheme = typeof lightTheme;
