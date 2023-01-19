import { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  gap?: string;
  justify?: string;
}

export const Row = ({ children, gap = "1rem", justify = "flex-start" }: RowProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: gap,
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
};
