import { TimelineProps } from "components/Timeline/data";
import { Post } from "types/post";

export const sortBlogPostByDate = (a: Post, b: Post) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const sortByDate = (a: TimelineProps, b: TimelineProps) => {
  return parseInt(b.date) - parseInt(a.date);
};
