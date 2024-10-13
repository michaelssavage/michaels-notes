import { useAnimation, useScroll, useTransform } from "framer-motion";
import { AnimatedLine } from "./HomeLine.styled";

export const HomeLine = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  const widthPercentage = useTransform(scrollY, [0, 1000], [75, 0]);

  const width = useTransform(widthPercentage, (value) => `${value}%`);

  return <AnimatedLine style={{ width }} animate={controls} />;
};
