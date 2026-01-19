import type { SVGProps } from "react";
import type { JSX } from "react/jsx-runtime";

interface Props {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const CheckIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> & Props,
) => {
  return (
    <svg
      role="img"
      aria-label="check icon"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ?? "currentColor"}
      strokeWidth={props.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
};
