import { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  gap?: string;
}

export const Row = ({ children, gap = "1rem" }: RowProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: gap,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
};
