import type { SVGProps } from "react";
import type { JSX } from "react/jsx-runtime";

interface Props {
  color?: string;
  size?: number;
}

export const ArrowDown = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> & Props,
) => {
  return (
    <svg
      role="img"
      aria-label="arrow down icon"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M16 15l-4 4" />
      <path d="M8 15l4 4" />
    </svg>
  );
};
