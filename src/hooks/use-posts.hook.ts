import { useQuery } from "@tanstack/react-query";
import type { IPosts } from "@/types/Post";

export function usePostsIndex(): IPosts {
	return (
		(import.meta.env.POSTS_INDEX as IPosts) || {
			projects: [],
			blogs: [],
			bites: [],
		}
	);
}

export function usePostContent<T = unknown>(category: string, slug: string) {
	return useQuery<T>({
		queryKey: ["post", category, slug],
		queryFn: async () => {
			const params = new URLSearchParams({ category, slug });
			const response = await fetch(`/.netlify/functions/get-posts?${params}`);

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ error: "Unknown error" }));
				throw new Error(errorData.error || "Post not found");
			}
			return response.json();
		},
		enabled: !!(category && slug),
	});
}

export function usePostsByCategory<K extends keyof IPosts>(
	category: K,
): IPosts[K] {
	const postsIndex = usePostsIndex();
	return postsIndex[category] || [];
}
