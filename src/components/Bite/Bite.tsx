import type { IBite } from "@/types/Post";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Bite.module.scss";
import { bites } from "./items";

interface Props {
  bite: IBite;
  index: number;
}

const BiteItem = ({ bite, index }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={styles.bite}
    >
      <p className={styles.yearColor}>{bite.year}</p>
      <p className={styles.biteText}>{bite.title}</p>
    </motion.li>
  );
};

export const Bite = () => {
  return (
    <main className={styles.container}>
      <h2>Bites</h2>
      <ul className={styles.biteList}>
        {bites.map((bite, index) => (
          <BiteItem key={bite.id} bite={bite} index={index} />
        ))}
      </ul>
    </main>
  );
};
