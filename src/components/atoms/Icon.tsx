import { Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface IconLinkProps {
  link: string;
  isExternal?: boolean;
  icon: ReactNode;
}

const proximityThreshold = 90;

export const Icon = ({ link, isExternal = false, icon }: IconLinkProps) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iconRef.current) return;

      const rect = iconRef.current.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;
      const distanceX = e.clientX - iconCenterX;
      const distanceY = e.clientY - iconCenterY;

      if (
        Math.abs(distanceX) < proximityThreshold &&
        Math.abs(distanceY) < proximityThreshold
      ) {
        const moveX = distanceX * 0.2;
        const moveY = distanceY * 0.2;
        setTransform({ x: moveX, y: moveY });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Link
      to={link}
      ref={iconRef}
      className="icon-link"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {icon}
    </Link>
  );
};
