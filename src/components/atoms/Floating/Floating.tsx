import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/molecules/Overlays";
import type { ReactNode } from "react";

interface IFloating {
  type: "tooltip" | "popover";
  trigger: ReactNode;
  content: ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  asChild?: boolean;
  enabled?: boolean;
}

export const Floating = ({
  type,
  trigger,
  content,
  asChild = true,
  enabled = true,
  ...options
}: IFloating) => {
  if (type === "popover") {
    return (
      <Popover {...options}>
        <PopoverTrigger asChild={asChild}>{trigger}</PopoverTrigger>
        {enabled && <PopoverContent>{content}</PopoverContent>}
      </Popover>
    );
  }

  return (
    <Tooltip {...options}>
      <TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
      {enabled && <TooltipContent>{content}</TooltipContent>}
    </Tooltip>
  );
};
