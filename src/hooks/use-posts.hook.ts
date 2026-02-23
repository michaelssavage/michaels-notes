import { getBites, getBlogs, getProjects, getReviews } from "@/api/posts.api";
import type { IBite, IBlog, IProject, IReview } from "@/types/Post";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

type QueryFn = QueryFunction<
  IProject[] | IBlog[] | IReview[] | IBite[],
  string[]
>;

export function usePosts(category: "projects"): IProject[];
export function usePosts(category: "blogs"): IBlog[];
export function usePosts(category: "reviews"): IReview[];
export function usePosts(category: "bites"): IBite[];

export function usePosts(category: "projects" | "blogs" | "reviews" | "bites") {
  const fnMap = {
    projects: useServerFn(getProjects),
    blogs: useServerFn(getBlogs),
    reviews: useServerFn(getReviews),
    bites: useServerFn(getBites),
  } as const;

  const { data } = useQuery({
    queryKey: ["posts", category],
    queryFn: fnMap[category] as QueryFn,
    retry: false,
  });

  return data || [];
}
