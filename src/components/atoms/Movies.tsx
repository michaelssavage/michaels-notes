import { fetchFavouriteMovies } from "@/api/favorite-movies.api";
import type { IMovie } from "@/types/Movie";
import { useQuery } from "@tanstack/react-query";

export const Movies = () => {
	const { data, isLoading, error } = useQuery<Array<IMovie>>({
		queryKey: ["favorites"],
		queryFn: fetchFavouriteMovies,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return null;

	return (
		<div>
			<h1>Favorites</h1>
			{data ? (
				data.map(({ title }) => <div key={title}>{title}</div>)
			) : (
				<p>No Data</p>
			)}
		</div>
	);
};
