import { TimelineProps } from "components/Timeline/data";
import { BlogPost } from "types/blog-post";

export const sortBlogPostByDate = (a: BlogPost, b: BlogPost) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const sortByDate = (a: TimelineProps, b: TimelineProps) => {
  return parseInt(b.date) - parseInt(a.date);
};
