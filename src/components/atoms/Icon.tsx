import { Floating } from "@/components/atoms/Floating";
import { Anchor } from "@/components/molecules/Anchor";
import { Link } from "@tanstack/react-router";
import { type ReactElement } from "react";

interface IconLinkProps {
  link: string;
  isExternal?: boolean;
  icon: ReactElement;
  label: string;
  useFloating?: boolean;
}

export const Icon = ({
  link,
  isExternal = false,
  icon,
  label,
  useFloating = false,
}: IconLinkProps) => {
  if (!useFloating) {
    return (
      <Anchor
        link={link}
        isExternal={isExternal}
        icon={icon}
        text={label}
        variant="footer"
      />
    );
  }

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
