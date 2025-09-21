import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { SearchIcon } from "../../icons";
import { SearchBox } from "./SearchBox";

const meta: Meta<typeof SearchBox> = {
  title: "Molecules/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  parameters: { backgroundColor: "transparent" },
};
export default meta;

type Story = StoryObj<typeof SearchBox>;

type SearchBoxProps = React.ComponentProps<typeof SearchBox>;

const Template = (args: Omit<SearchBoxProps, "value" | "onChange">) => {
  const [value, setValue] = useState("");
  return (
    <SearchBox
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    id: "search-default",
    placeholder: "Search...",
  },
};

export const WithLabel: Story = {
  render: Template,
  args: {
    id: "search-label",
    label: "Search for something",
    placeholder: "Type here...",
  },
};

export const WithCustomIcon: Story = {
  render: Template,
  args: {
    id: "search-custom-icon",
    placeholder: "Custom icon...",
    icon: <SearchIcon />,
  },
};
