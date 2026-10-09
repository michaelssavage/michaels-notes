import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Loading as LoadingComponent } from "./Loading";

const meta: Meta<typeof LoadingComponent> = {
  title: "Molecules/Loading",
  component: LoadingComponent,
  parameters: { backgroundColor: "transparent" },
};

export default meta;

type Story = StoryObj<typeof LoadingComponent>;

export const Loading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("loading")).toBeInTheDocument();
  },
};
