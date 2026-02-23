import type { SerializedStyles } from "@emotion/react";
import { ImageStyle, NotFound, Wrapper } from "./Picture.styled";

interface Props {
  src: string;
  alt: string;
  style?: SerializedStyles;
  loading?: "lazy" | "eager";
  ar?: string;
  caption?: string;
  fit?: "cover" | "contain";
}

export const Picture = ({
  src,
  alt,
  style,
  loading = "lazy",
  ar,
  caption,
  fit = "cover",
}: Props) => {
  if (!src) {
    return <NotFound src="/not-found.png" alt="src not found" />;
  }

  return (
    <Wrapper css={style}>
      <ImageStyle src={src} alt={alt} loading={loading} ar={ar} fit={fit} />
      {caption && <figcaption>{caption}</figcaption>}
    </Wrapper>
  );
};
