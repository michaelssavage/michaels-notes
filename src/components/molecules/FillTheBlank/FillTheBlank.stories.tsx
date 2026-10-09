import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { FillInTheBlank } from "./FillTheBlank";

const meta: Meta<typeof FillInTheBlank> = {
  title: "Molecules/FillInTheBlank",
  component: FillInTheBlank,
  parameters: { backgroundColor: "transparent" },
  args: {
    heading: "Present tense",
    beforeText: "Yo ",
    afterText: " (comer) una manzana.",
    correctAnswer: "como",
  },
};

export default meta;

type Story = StoryObj<typeof FillInTheBlank>;

export const Empty: Story = {};

export const CorrectAnswer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "como");
    await expect(canvas.queryByText("Show Answer")).not.toBeInTheDocument();
  },
};

export const WrongAnswerShowsAnswer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "comes");
    await userEvent.click(canvas.getByText("Show Answer"));
    await expect(input).toHaveValue("como");
  },
};
