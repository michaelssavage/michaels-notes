import { memo } from "react";
import BiteSkeleton from "./Bite/BiteSkeleton";
import PostSkeleton from "./Post/PostSkeleton";

const PostsLoadingSkeleton = memo(() => {
  return (
    <>
      <PostSkeleton />
      <BiteSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <BiteSkeleton />
      <PostSkeleton />
    </>
  );
});

PostsLoadingSkeleton.displayName = "PostsLoadingSkeleton";

export default PostsLoadingSkeleton;
