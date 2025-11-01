import { useEffect, useState } from "react";

export const useSanitizedHTML = (html: string) => {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined") {
      import("dompurify").then((DOMPurify) => {
        setSanitized(DOMPurify.default.sanitize(html));
      });
    }
  }, [html]);

  return sanitized;
};
