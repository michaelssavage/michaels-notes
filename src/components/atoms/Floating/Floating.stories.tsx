import type { Meta, StoryObj } from "@storybook/react";
import { Floating } from "./Floating";
import { BasicContent } from "./Floating.styled";

const meta: Meta<typeof Floating> = {
  title: "Molecules/Overlays",
  component: Floating,
  argTypes: {
    type: {
      control: "select",
      options: ["tooltip", "popover"],
      description: "Controls the way the floating component works",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Decide what way the content placement appears",
    },
    enabled: {
      control: "boolean",
      defaultValue: true,
      description: "Controls whether the floating ui is enabled",
    },
    trigger: { control: false },
    content: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Floating>;

export const BasicPopover: Story = {
  args: {
    type: "popover",
    trigger: <button type="button">Open Popover</button>,
    content: <div>This is a popover content!</div>,
    placement: "right",
    enabled: true,
  },
};

export const BasicTooltip: Story = {
  args: {
    type: "tooltip",
    trigger: <span>Hover me</span>,
    content: <BasicContent>This is a tooltip!</BasicContent>,
    placement: "top",
    enabled: true,
  },
};
