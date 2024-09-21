import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import styles from "./Ball.module.scss";

export const Ball = () => {
  const [bgColor, setBgColor] = useState("#009a7b");

  const { scrollY } = useScroll();

  const size = useTransform(scrollY, [0, 700], [400, 1600]);

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
  };

  return (
    <div className={styles.ball}>
      <motion.div
        className={styles.clickableLayer}
        style={{
          width: size,
          height: size,
        }}
        onClick={() => setBgColor(getRandomColor())}
      />

      <motion.button
        type="button"
        className={styles.circle}
        style={{
          backgroundColor: bgColor,
          width: size,
          height: size,
        }}
      />
    </div>
  );
};
