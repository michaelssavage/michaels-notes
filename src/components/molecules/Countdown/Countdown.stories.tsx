import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Countdown } from "./Countdown";

const DAY = 1000 * 60 * 60 * 24;

const meta: Meta<typeof Countdown> = {
  title: "Molecules/Countdown",
  component: Countdown,
  argTypes: {
    targetDate: { control: "date" },
  },
  parameters: { backgroundColor: "transparent" },
};

export default meta;

type Story = StoryObj<typeof Countdown>;

export const ThreeDaysAway: Story = {
  args: { targetDate: new Date(Date.now() + 3 * DAY + 5000) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("03")).toBeVisible();
    await expect(canvas.getByText("Days")).toBeVisible();
  },
};

export const InThePast: Story = {
  args: { targetDate: new Date(Date.now() - DAY) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText("00")).toHaveLength(4);
  },
};
