import { Post } from "types/post";
import { sortBlogPostByDate } from "./sortByDate";

export const filterPosts = (posts: Post[]) => {
  return posts.filter((post) => post.live).sort(sortBlogPostByDate);
};
