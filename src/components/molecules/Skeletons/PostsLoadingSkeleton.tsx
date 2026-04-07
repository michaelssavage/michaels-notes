import BiteSkeleton from "../Bite/BiteSkeleton";
import PostSkeleton from "../Post/PostSkeleton";

export default function PostsLoadingSkeleton() {
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
}
