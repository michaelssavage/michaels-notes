import type { IProject } from "@/types/Post";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { LoadingProject } from "./LoadingProject";
import { Project } from "./Project";

const project: IProject = {
  code: "",
  slug: "/projects/b2b-order-system",
  id: 1,
  title: "B2B Order System",
  date: "march 13, 2024",
  description: "A concurrent client/server model with a React frontend.",
  technology: ["React.js", "Python"],
  colors: { main: "#1d3557", bg: "#a8dadc" },
};

const meta: Meta<typeof Project> = {
  title: "Atoms/Project",
  component: Project,
  parameters: { backgroundColor: "transparent" },
  decorators: [
    (Story) => (
      <div style={{ width: "720px" }}>
        <Story />
      </div>
    ),
  ],
  args: { data: project },
};

export default meta;

type Story = StoryObj<typeof Project>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "B2B Order System" }),
    ).toBeVisible();
    await expect(canvas.queryByText("Draft")).not.toBeInTheDocument();
  },
};

export const Draft: Story = {
  args: { data: { ...project, draft: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Draft")).toBeVisible();
  },
};

export const WithImage: Story = {
  args: { data: { ...project, image: "/project/emot.png" } },
};

export const Loading: StoryObj = {
  render: () => <LoadingProject />,
};
