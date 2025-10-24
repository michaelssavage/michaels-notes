import { getMiniPosts } from "@/server/posts";
import { IPosts } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export function usePosts<K extends keyof IPosts>(category: K) {
  const getPosts = useServerFn(getMiniPosts);

  const { data } = useQuery<IPosts>({
    queryKey: ["posts-index"],
    queryFn: () => getPosts(),
    retry: false,
  });

  return data?.[category] || [];
}
