import type { Meta, StoryObj } from "@storybook/react";
import { SpotifyIcon } from "../../icons";
import { Anchor } from "./Anchor";

const meta: Meta<typeof Anchor> = {
	title: "Molecules/Anchor",
	component: Anchor,
	argTypes: {
		style: { control: false },
		icon: { control: false },
	},
	parameters: { backgroundColor: "transparent" },
};

export default meta;

type Story = StoryObj<typeof Anchor>;

export const Button: Story = {
	args: {
		link: "https://example.com",
		text: "Button Anchor",
		variant: "button",
	},
};

export const Link: Story = {
	args: {
		link: "https://example.com",
		text: "Link Anchor",
		variant: "link",
	},
};

export const Text: Story = {
	args: {
		link: "https://example.com",
		text: "Text Anchor",
		variant: "text",
		isExternal: true,
	},
};

export const IconOnHover: Story = {
	args: {
		link: "https://example.com",
		text: "Anchor with Icon",
		icon: <SpotifyIcon />,
		variant: "link",
	},
};
