import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Thumb } from "./SelectControl.styled";

export const ThumbPositioned = ({ activeIdx }: { activeIdx: number }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState<{ left: number; width: number } | null>(
    null,
  );

  const measure = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    const track = el.closest("#track") as HTMLElement | null;
    if (!track) return;
    const seg = track.querySelectorAll("button")[activeIdx] as
      | HTMLElement
      | undefined;
    if (!seg) return;
    setDims({ left: seg.offsetLeft, width: seg.offsetWidth });
  }, [activeIdx]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      elRef.current = el;
      if (el) measure();
    },
    [measure],
  );

  return (
    <Thumb
      ref={ref}
      style={dims ? { left: dims.left, width: dims.width } : { opacity: 0 }}
    />
  );
};
