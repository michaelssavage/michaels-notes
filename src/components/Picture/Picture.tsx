import notFoundImg from "@/assets/images/not-found.png";
import type { SerializedStyles } from "@emotion/react";
import { memo, useEffect, useState } from "react";
import { ImageStyle, NotFound, Placeholder, Wrapper } from "./Picture.styled";

interface Props {
  src: string;
  alt: string;
  style?: SerializedStyles;
  loading?: "lazy" | "eager";
  ar?: string;
}

export const Picture: React.FC<Props> = memo(
  ({ src, alt, style, loading = "lazy", ar = "3/2" }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const img = new Image();
      img.src = src;

      if (img.complete) {
        setImageLoaded(true);
        setIsLoading(false);
      } else {
        img.onload = () => {
          setImageLoaded(true);
          setIsLoading(false);
        };
        img.onerror = () => {
          setIsLoading(false);
        };
      }

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [src]);

    if (!src) {
      return <NotFound src={notFoundImg} alt="src not found" />;
    }

    return (
      <Wrapper css={style}>
        {isLoading && <Placeholder ar={ar} />}
        {imageLoaded && (
          <ImageStyle
            src={src}
            alt={alt}
            loaded={imageLoaded}
            loading={loading}
            ar={ar}
          />
        )}
      </Wrapper>
    );
  }
);
