import type { ReactNode } from "react";

interface IconLinkProps {
  link: string;
  external?: boolean;
  icon: ReactNode;
}

const Icon = ({ link, external = false, icon }: IconLinkProps) => {
  return (
    <a
      href={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="icon-link"
    >
      {icon}
    </a>
  );
};

export default Icon;
