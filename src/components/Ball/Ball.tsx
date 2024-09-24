import { useScroll, useTransform } from "framer-motion";
import { memo, useCallback, useMemo, useState } from "react";
import { BallWrapper, Circle, Clickable } from "./Ball.styled";

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

export const Ball = memo(() => {
  const [bgColor, setBgColor] = useState("#009a7b");

  const { scrollY } = useScroll();

  const size = useTransform(scrollY, [0, 500], [10, 2000]);

  const circleStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
      width: size,
      height: size,
    }),
    [bgColor, size]
  );

  const handleClick = useCallback(() => setBgColor(getRandomColor()), []);

  return (
    <BallWrapper>
      <Clickable
        type="button"
        style={{
          width: size,
          height: size,
        }}
        onClick={handleClick}
      />

      <Circle style={circleStyle} />
    </BallWrapper>
  );
});
