import { useEffect } from "react";

export const useEruda = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("debug")) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    script.onload = () => (window as any).eruda?.init();
    document.body.appendChild(script);
  }, []);
};
