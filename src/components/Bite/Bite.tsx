import type { IBite } from "@/types/Post";
import { motion, useInView } from "framer-motion";
import { type Ref, memo, useMemo, useRef } from "react";
import { AnimatedBite, BitePanel, Text, Year } from "./Bite.styled";
import { bites } from "./items";

interface IB {
  biteRef?: Ref<HTMLHeadingElement>;
}

interface Props {
  bite: IBite;
  index: number;
}

const BiteItem = memo(({ bite, index }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: "some" });

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

export const Bite = ({ biteRef }: IB) => {
  return (
    <BitePanel>
      <h2 ref={biteRef}>Bites</h2>
      <motion.ul>
        {bites.map((bite, index) => (
          <BiteItem key={bite.id} bite={bite} index={index} />
        ))}
      </motion.ul>
    </BitePanel>
  );
};
