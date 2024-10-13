export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

export const getContrastYIQ = (hex: string) => {
  const hexcolor = hex.replace(/^#/, "");

  const r = Number.parseInt(hexcolor.slice(0, 2), 16);
  const g = Number.parseInt(hexcolor.slice(2, 4), 16);
  const b = Number.parseInt(hexcolor.slice(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance >= 128 ? "#070f06" : "#f1f9f0";
};
