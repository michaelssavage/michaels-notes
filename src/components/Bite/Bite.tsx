import type { IBite } from "@/types/Post";
import { motion, useInView } from "framer-motion";
import { memo, useMemo, useRef } from "react";
import { AnimatedBite, Panel, Text, Year } from "./Bite.styled";
import { bites } from "./items";

interface Props {
  bite: IBite;
  index: number;
}

const BiteItem = memo(({ bite, index }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const animationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 50 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.5, delay: index * 0.1 },
    }),
    [isInView, index]
  );

  return (
    <AnimatedBite ref={ref} {...animationProps}>
      <Year>{bite.year}</Year>
      <Text>{bite.title}</Text>
    </AnimatedBite>
  );
});

export const Bite = () => {
  return (
    <Panel>
      <h2>Bites</h2>
      <motion.ul>
        {bites.map((bite, index) => (
          <BiteItem key={bite.id} bite={bite} index={index} />
        ))}
      </motion.ul>
    </Panel>
  );
};
