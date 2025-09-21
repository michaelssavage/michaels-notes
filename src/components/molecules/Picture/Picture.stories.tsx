import { css } from "@emotion/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Picture } from "./Picture";

const meta: Meta<typeof Picture> = {
  title: "Molecules/Picture",
  component: Picture,
  tags: ["autodocs"],
  args: {
    alt: "Sample image",
    src: "/favicon.png",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <Picture
      {...args}
      style={css`
        width: 120px;
      `}
    />
  ),
  parameters: { backgroundColor: "transparent" },
};

export default meta;
type Story = StoryObj<typeof Picture>;

export const Default: Story = {};

export const WithCaption: Story = {
  args: {
    caption: "This is a caption for the image.",
  },
};

export const NotFoundImage: Story = {
  args: {
    src: "",
  },
};
