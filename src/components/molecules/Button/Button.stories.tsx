import type { Meta, StoryObj } from "@storybook/react";
import { PlayIcon } from "../../icons";
import { Button } from "./Button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
	title: "Molecules/Button",
	component: Button,
	argTypes: {
		onClick: { action: "clicked" },
		styles: { control: false },
		selected: {
			control: { type: "boolean" },
			if: { arg: "variant", eq: "pill" },
		},
		active: {
			control: { type: "boolean" },
			if: { arg: "icon", exists: true },
		},
	},
	parameters: { backgroundColor: "transparent" },
};

export default meta;

export const Primary: Story = {
	args: {
		text: "Primary Button",
		variant: "primary",
	},
};

export const Secondary: Story = {
	args: {
		text: "Secondary Button",
		variant: "secondary",
	},
};

export const Ghost: Story = {
	args: {
		text: "Ghost Button",
		variant: "ghost",
	},
};

export const Pill: Story = {
	args: {
		text: "Pill Button",
		variant: "pill",
	},
};

export const WithIcon: Story = {
	args: {
		text: "Play",
		icon: <PlayIcon />,
		variant: "primary",
		active: true,
	},
};
