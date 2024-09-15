import { CSSProperties, useState } from "react";
import styles from "./Picture.module.scss";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
}

export const Picture = ({ src, alt, style }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${style}`}>
      {!loaded && <div className={styles.placeholder}></div>}
      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${loaded ? styles.loaded : styles.loading}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={style}
      />
    </div>
  );
};
