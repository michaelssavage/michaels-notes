import { slideInAnimation } from "@/styles/abstracts/animations.styled";
import styled from "@emotion/styled";
import { animated, useScroll } from "@react-spring/web";
import { useEffect, useState } from "react";

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
  const [isClient, setIsClient] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Default to initial scroll position (0) for SSR to match client initial state
  const width = isClient
    ? scrollY
        .to({
          range: [0, 1000],
          output: [100, 0],
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
        .to((value) => `${value}%`)
    : "100%";

  return (
    <animated.div
      style={{ width, willChange: "width" }}
      suppressHydrationWarning
    >
      <AnimatedLineStyled />
    </animated.div>
  );
};
