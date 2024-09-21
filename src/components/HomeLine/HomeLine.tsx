import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import styles from "./HomeLine.module.scss";

export const HomeLine = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  const rotate = useTransform(scrollY, [100, 1000], [0, 90]);
  const translateX = useTransform(scrollY, [200, 1000], [0, 800]);

  const transform = useTransform([rotate, translateX], ([r = 0, y = 0]) => {
    return `rotate(${r}deg) translateX(${y}px)`;
  });

  return (
    <motion.div
      className={styles.homeLine}
      style={{ transform }}
      animate={controls}
    />
  );
};
