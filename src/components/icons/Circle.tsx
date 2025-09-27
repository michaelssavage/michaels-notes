interface IconProps {
  dataId?: string;
  color?: string;
  size?: string;
}

export const CircleIcon = ({
  dataId,
  color = "currentColor",
  size = "24",
}: IconProps) => {
  return (
    <svg
      data-id={dataId}
      role="img"
      aria-label="circle icon"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </svg>
  );
};
