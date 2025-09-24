import { getCompiledPost, getPostsIndex } from "@/lib/getPosts";
import type { IPosts } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";

export function usePostsIndex() {
  return useQuery<IPosts>({
    queryKey: ["posts-index"],
    queryFn: getPostsIndex,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Load compiled post content
export function usePostContent<T = unknown>(category: string, slug: string) {
  return useQuery<T>({
    queryKey: ["post", category, slug],
    queryFn: () => getCompiledPost<T>(category, slug),
    enabled: !!(category && slug),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get posts by category
export function usePostsByCategory<K extends keyof IPosts>(category: K) {
  const { data: postsIndex } = usePostsIndex();
  return postsIndex?.[category] || [];
}
