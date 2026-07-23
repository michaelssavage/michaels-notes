import type { SerializedStyles } from "@emotion/react";
import type { MouseEvent } from "react";
import { ImageStyle, NotFound, Wrapper } from "./Picture.styled";

interface Props {
  src: string;
  alt: string;
  style?: SerializedStyles;
  loading?: "lazy" | "eager";
  ar?: string;
  caption?: string;
  fit?: "cover" | "contain";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const Picture = ({
  src,
  alt,
  style,
  loading = "lazy",
  ar,
  caption,
  fit = "cover",
  onClick,
}: Props) => {
  if (!src) {
    return <NotFound src="/not-found.png" alt="src not found" />;
  }

  return (
    <Wrapper css={style} onClick={onClick}>
      <ImageStyle src={src} alt={alt} loading={loading} ar={ar} fit={fit} />
      {caption && <figcaption>{caption}</figcaption>}
    </Wrapper>
  );
};
