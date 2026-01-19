import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
