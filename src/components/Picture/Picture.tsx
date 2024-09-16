import { type CSSProperties, useEffect, useState } from "react";
import styles from "./Picture.module.scss";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
}

export const Picture: React.FC<Props> = ({
  src,
  alt,
  style,
  loading = "lazy",
}) => {
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

  return (
    <div className={`${styles.wrapper} ${style}`}>
      {isLoading && <div className={styles.placeholder} />}
      {imageLoaded && (
        <img
          src={src}
          alt={alt}
          className={`${styles.image} ${styles.loaded}`}
          loading={loading}
          style={style}
        />
      )}
    </div>
  );
};
