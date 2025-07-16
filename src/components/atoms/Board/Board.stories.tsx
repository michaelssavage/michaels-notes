import type { Meta, StoryObj } from "@storybook/react";
import { Board as BoardComponent } from "./Board";

const meta: Meta<typeof BoardComponent> = {
	title: "Atoms",
	component: BoardComponent,
	argTypes: {
		title: { control: "text" },
		text: { control: "text" },
		children: { control: "text" },
	},
	parameters: { backgroundColor: "transparent" },
};

export default meta;

type Story = StoryObj<typeof BoardComponent>;

export const Board: Story = {
	args: {
		title: "Board",
		text: "This board also has children elements.",
		children: (
			<div style={{ color: "blue" }}>
				This is a child element inside the Board.
			</div>
		),
	},
};
