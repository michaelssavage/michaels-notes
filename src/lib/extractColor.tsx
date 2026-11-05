import { useEffect, useState } from "react";

interface ColorOptions {
  maxColors: number;
  format: "rgba" | "hex";
  maxSize: number;
}

interface ColorResult {
  dominantColor: string | null;
  darkerColor: string | null;
  lighterColor: string | null;
  colors: string[];
}

const defaultOptions: ColorOptions = {
  maxColors: 3,
  format: "hex",
  maxSize: 10,
};

/** The outcome of extracting colours from one specific image URL. */
type Settled =
  | { url: string; status: "success"; result: ColorResult }
  | { url: string; status: "error"; error: Error };

const emptyResult: ColorResult = {
  dominantColor: null,
  darkerColor: null,
  lighterColor: null,
  colors: [],
};

function useExtractColor(
  imageUrl: string,
  optionsCustom: Partial<ColorOptions> = {},
) {
  const options: ColorOptions = { ...defaultOptions, ...optionsCustom };

  const [settled, setSettled] = useState<Settled | null>(null);

  useEffect(() => {
    if (!imageUrl) return;
    let isMounted = true;

    extractDominantColors(imageUrl, options.maxSize)
      .then((colors) => {
        if (!isMounted) return;
        setSettled({
          url: imageUrl,
          status: "success",
          result: formatColors(colors, options.format, options.maxColors),
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        setSettled({
          url: imageUrl,
          status: "error",
          error:
            error instanceof Error
              ? error
              : new Error("An unknown error occurred"),
        });
      });

    return () => {
      isMounted = false;
    };
  }, [imageUrl, options.format, options.maxColors, options.maxSize]);

  // Only a result for the current URL counts. Anything else is from a previous
  // image, so we're still loading (or idle when there's no image at all).
  const current = settled?.url === imageUrl ? settled : null;
  const status = !imageUrl ? "idle" : (current?.status ?? "loading");
  const result = current?.status === "success" ? current.result : emptyResult;

  return {
    ...result,
    status,
    loading: status === "loading",
    error: current?.status === "error" ? current.error : null,
  };
}

async function extractDominantColors(
  imageUrl: string,
  maxSize: number,
): Promise<ColorResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Unable to get canvas context"));
        return;
      }

      const { width, height } = img;
      const scaleFactor = Math.min(1, maxSize / Math.max(width, height));

      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const colorMap: { [key: string]: number } = {};

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        if (a >= 125) {
          const color = `rgba(${r},${g},${b},${a})`;
          if (!colorMap[color]) {
            colorMap[color] = 0;
          }
          colorMap[color]++;
        }
      }

      const colors = Object.keys(colorMap).sort(
        (a, b) => colorMap[b] - colorMap[a],
      );

      let dominantColor: string | null = null;
      let darkerColor: string | null = null;
      let lighterColor: string | null = null;

      if (colors.length > 0) {
        dominantColor = colors[0];
        darkerColor = getDarkerColor(dominantColor);
        lighterColor = getLighterColor(dominantColor);
      }

      resolve({
        dominantColor,
        darkerColor,
        lighterColor,
        colors,
      });
    };

    img.onerror = (error) => {
      reject(
        error instanceof Error ? error : new Error("Image loading failed"),
      );
    };

    img.src = imageUrl;
  });
}

function formatColors(
  colors: ColorResult,
  format: "rgba" | "hex",
  maxColors: number,
): ColorResult {
  switch (format) {
    case "hex":
      return {
        dominantColor: colors.dominantColor
          ? rgbToHex(colors.dominantColor)
          : null,
        darkerColor: colors.darkerColor ? rgbToHex(colors.darkerColor) : null,
        lighterColor: colors.lighterColor
          ? rgbToHex(colors.lighterColor)
          : null,
        colors: colors.colors
          .slice(0, maxColors)
          .map((color) => rgbToHex(color) || color),
      };
    default:
      return {
        ...colors,
        colors: colors.colors.slice(0, maxColors),
      };
  }
}

function getDarkerColor(color: string): string | null {
  const rgb = color.match(/\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/);
  if (!rgb) return null;

  const r = Number.parseInt(rgb[1]);
  const g = Number.parseInt(rgb[2]);
  const b = Number.parseInt(rgb[3]);

  const darkerRed = Math.max(0, r - 50);
  const darkerGreen = Math.max(0, g - 50);
  const darkerBlue = Math.max(0, b - 50);

  return `rgb(${darkerRed},${darkerGreen},${darkerBlue})`;
}

function getLighterColor(color: string): string | null {
  const rgb = color.match(/\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/);
  if (!rgb) return null;

  const r = Number.parseInt(rgb[1]);
  const g = Number.parseInt(rgb[2]);
  const b = Number.parseInt(rgb[3]);

  const lighterRed = Math.min(255, r + 30);
  const lighterGreen = Math.min(255, g + 30);
  const lighterBlue = Math.min(255, b + 30);

  return `rgb(${lighterRed},${lighterGreen},${lighterBlue})`;
}

function rgbToHex(rgb: string): string | null {
  const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/;
  const match = rgb.match(rgbaRegex);
  if (!match) return null;

  const r = Number.parseInt(match[1]);
  const g = Number.parseInt(match[2]);
  const b = Number.parseInt(match[3]);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default useExtractColor;
