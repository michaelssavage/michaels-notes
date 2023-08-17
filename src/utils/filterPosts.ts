import { BlogPost } from "types/blog-post";
import { sortBlogPostByDate } from "./sortByDate";

export const filterPosts = (posts: BlogPost[]) => {
  return posts.filter((post) => post.live).sort(sortBlogPostByDate);
};
