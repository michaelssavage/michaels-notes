import Image from "next/image";
import { CSSProperties } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export const NextImage = ({ src, alt, width = "100%", height = "50vh" }: ImageProps) => {
  const css: CSSProperties = { maxWidth: "100%", width: width, objectFit: "contain" };

  return (
    <div style={{ position: "relative", height: height }}>
      <Image
        src={src}
        alt={alt}
        fill
        style={css}
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      ></Image>
    </div>
  );
};
