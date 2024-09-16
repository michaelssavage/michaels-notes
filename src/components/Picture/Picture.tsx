import { type CSSProperties, useState } from "react";
import styles from "./Picture.module.scss";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
}

export const Picture = ({ src, alt, style, loading = "lazy" }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${style}`}>
      {!loaded && <div className={styles.placeholder} />}
      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${loaded ? styles.loaded : undefined}`}
        loading={loading}
        onLoad={() => setLoaded(true)}
        style={style}
      />
    </div>
  );
};
