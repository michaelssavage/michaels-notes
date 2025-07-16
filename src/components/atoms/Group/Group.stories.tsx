import type { Meta, StoryObj } from "@storybook/react";
import { Group as GroupComponent } from "./Group";

const meta: Meta<typeof GroupComponent> = {
	title: "Atoms/Group",
	component: GroupComponent,
	argTypes: {
		direction: {
			control: "select",
			options: ["row", "column", "row-reverse", "column-reverse"],
		},
		align: {
			control: "select",
			options: ["flex-start", "flex-end", "center"],
		},
		justify: {
			control: "select",
			options: ["flex-start", "flex-end", "center", "space-between"],
		},
		wrap: {
			control: "select",
			options: ["wrap", "nowrap"],
		},
		gap: { control: "text" },
		width: { control: "text" },
	},
};

export default meta;
type Story = StoryObj<typeof GroupComponent>;

export const Group: Story = {
	args: {
		direction: "row",
		align: "center",
		justify: "flex-start",
		gap: "1rem",
		children: [
			<div key="1" style={{ background: "#ec5c5c", padding: "1rem" }}>
				Child 1
			</div>,
			<div key="2" style={{ background: "#6883f0", padding: "1rem" }}>
				Child 2
			</div>,
			<div key="3" style={{ background: "#eca900", padding: "1rem" }}>
				Child 3
			</div>,
		],
	},
};
