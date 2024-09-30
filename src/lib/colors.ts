export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

export const getContrastYIQ = (hex: string) => {
  // Remove the hash at the start if it's there
  const hexcolor = hex.replace(/^#/, "");

  // Parse r, g, b values from the hex string
  const r = Number.parseInt(hexcolor.substr(0, 2), 16);
  const g = Number.parseInt(hexcolor.substr(2, 2), 16);
  const b = Number.parseInt(hexcolor.substr(4, 2), 16);

  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Return black for light colors, white for dark colors
  return luminance >= 128 ? "#000000" : "#FFFFFF";
};
