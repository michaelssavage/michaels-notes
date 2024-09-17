import { useState } from "react";
import styles from "./Ball.module.scss";

export const Ball = () => {
  const [bgColor, setBgColor] = useState("#009a7b");

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
  };

  return (
    <button
      type="button"
      className={styles.circle}
      style={{ backgroundColor: bgColor }}
      onClick={() => setBgColor(getRandomColor())}
    />
  );
};
