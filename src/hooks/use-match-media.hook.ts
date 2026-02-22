import { useSyncExternalStore } from "react";

export const useMatchMedia = (query: string) => {
  return useSyncExternalStore(
    (callback) => {
      if (
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function"
      )
        return () => {};

      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => {
      if (
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function"
      )
        return false;
      return window.matchMedia(query).matches;
    },
    () => false
  );
};
