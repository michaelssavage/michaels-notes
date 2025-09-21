import type { IBite } from "@/types/Post";
import type { Meta, StoryObj } from "@storybook/react";
import { Bite } from ".";

const meta: Meta<typeof Bite> = {
  title: "Molecules/Bite",
  component: Bite,
  tags: ["autodocs"],
  argTypes: {
    date: { control: "text" },
    description: { control: "text" },
  },
  parameters: { backgroundColor: "transparent" },
};
export default meta;

type Story = StoryObj<typeof Bite>;

const defaultBite: IBite = {
  slug: "default-bite",
  date: "12 March 2023",
  description: "Learned about React Server Components and their impact on SSR.",
  type: "bite",
};

export const Default: Story = {
  args: {
    ...defaultBite,
  },
};
