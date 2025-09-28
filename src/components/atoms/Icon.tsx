import { Floating } from "@/components/atoms/Floating";
import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

interface IconLinkProps {
  link: string;
  isExternal?: boolean;
  icon: ReactNode;
  label: string;
}

export const Icon = ({
  link,
  isExternal = false,
  icon,
  label,
}: IconLinkProps) => {
  return (
    <Floating
      type="tooltip"
      placement="bottom"
      trigger={
        <Link
          to={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {icon}
        </Link>
      }
      content={label}
    />
  );
};
