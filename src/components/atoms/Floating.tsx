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
}

export const Floating = ({ type, trigger, content, ...options }: IFloating) => {
	if (type === "popover") {
		return (
			<Popover {...options}>
				<PopoverTrigger asChild>{trigger}</PopoverTrigger>
				<PopoverContent>{content}</PopoverContent>
			</Popover>
		);
	}

	return (
		<Tooltip {...options}>
			<TooltipTrigger asChild>{trigger}</TooltipTrigger>
			<TooltipContent>{content}</TooltipContent>
		</Tooltip>
	);
};
