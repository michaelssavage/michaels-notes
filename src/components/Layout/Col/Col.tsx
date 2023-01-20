import { ReactNode } from "react";

interface ColProps {
  children: ReactNode;
  align?: string;
  gap?: string;
  justify?: string;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

export const Col = ({
  children,
  align = "normal",
  gap = "1rem",
  justify = "flex-start",
  wrap = "wrap",
}: ColProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
      }}
    >
      {children}
    </div>
  );
};
