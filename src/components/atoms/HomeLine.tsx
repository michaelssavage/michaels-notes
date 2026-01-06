import { slideInAnimation } from "@/styles/abstracts/animations.styled";
import styled from "@emotion/styled";
import { animated, useScroll } from "@react-spring/web";
import { useHydrated } from "@tanstack/react-router";

const AnimatedLineStyled = styled.div`
  margin-top: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.blue200};
  border-radius: 4px;
  z-index: -1;
  margin-right: auto;
  filter: url(#bleed);
  ${slideInAnimation("100px", "horizontal", "0.75s")}
`;

export const HomeLine = () => {
  const hydrated = useHydrated();
  const { scrollY } = useScroll();

  const width = scrollY
    .to({
      range: [0, 1000],
      output: [100, 0],
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    .to((value) => `${value}%`);

  if (!hydrated) return null;

  return (
    <animated.div style={{ width, willChange: "width" }}>
      <AnimatedLineStyled />
    </animated.div>
  );
};
