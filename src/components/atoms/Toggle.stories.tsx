import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: { backgroundColor: "transparent" },
  render: function Render(args) {
    const [on, setOn] = useState(args.on);
    return <Toggle on={on} handleChange={() => setOn((prev) => !prev)} />;
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  args: { on: false },
};

export const On: Story = {
  args: { on: true },
};

export const TogglesOnClick: Story = {
  args: { on: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", { name: "Toggle off" });

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};
