import type { IBlog, IReview } from "@/types/Post";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

const blog: IBlog = {
  slug: "concurrency-and-parallelism",
  code: "",
  title: "Concurrency and parallelism",
  date: "February 17, 2025",
  description:
    "Exploring how to execute multiple tasks with concurrency, parallelism, and multitasking.",
  isFirst: false,
  type: "blog",
  views: 42,
};

const review: IReview = {
  slug: "barry-lyndon",
  code: "",
  title: "Barry Lyndon",
  date: "January 5, 2025",
  description: "Candlelit, slow, and beautiful.",
  director: "Stanley Kubrick",
  releaseYear: 1975,
  isFirst: false,
  type: "review",
  views: 1,
};

const meta: Meta<typeof Post> = {
  title: "Molecules/Post",
  component: Post,
  parameters: { backgroundColor: "transparent" },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Blog: Story = {
  args: blog,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Concurrency and parallelism")).toBeVisible();
    await expect(canvas.getByText("42 views")).toBeVisible();
  },
};

export const Expanded: Story = {
  args: { ...blog, isFirst: true, lastUpdated: "March 1, 2025" },
};

export const Review: Story = {
  args: review,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1 view")).toBeVisible();
  },
};

export const External: Story = {
  args: { ...blog, isExternal: "https://plantbassd.com" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("plantbassd.com")).toBeVisible();
    await expect(canvas.queryByText(/views?$/)).not.toBeInTheDocument();
  },
};

export const Draft: Story = {
  args: { ...blog, draft: true },
};

export const Skeleton: StoryObj = {
  render: () => <PostSkeleton />,
};
