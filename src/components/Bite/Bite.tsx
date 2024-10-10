import type { IBite } from "@/types/Post";
import { motion } from "framer-motion";
import { type Ref, memo } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatedBite, BitePanel, Text, Year } from "./Bite.styled";
import { bites } from "./items";

interface IB {
  biteRef?: Ref<HTMLHeadingElement>;
}

interface Props {
  bite: IBite;
}

const BiteItem = memo(({ bite }: Props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <AnimatedBite ref={ref} inView={inView}>
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
        {bites.map((bite) => (
          <BiteItem key={bite.id} bite={bite} />
        ))}
      </motion.ul>
    </BitePanel>
  );
};
