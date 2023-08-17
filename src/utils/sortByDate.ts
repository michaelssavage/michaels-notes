import { BlogPost } from "types/blog-post";

export const sortBlogPostByDate = (a: BlogPost, b: BlogPost) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};
