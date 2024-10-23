import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/molecules/Overlays";
import type { ReactNode } from "@tanstack/react-router";

interface IFloating {
	type: "tooltip" | "popover";
	trigger: ReactNode;
	content: ReactNode;
	placement?: "top" | "right" | "bottom" | "left";
	asChild?: boolean;
}

export const Floating = ({
	type,
	trigger,
	content,
	asChild = true,
	...options
}: IFloating) => {
	if (type === "popover") {
		return (
			<Popover {...options}>
				<PopoverTrigger asChild={asChild}>{trigger}</PopoverTrigger>
				<PopoverContent>{content}</PopoverContent>
			</Popover>
		);
	}

	return (
		<Tooltip {...options}>
			<TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
			<TooltipContent>{content}</TooltipContent>
		</Tooltip>
	);
};
