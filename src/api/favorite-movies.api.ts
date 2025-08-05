import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const fetchFavouriteMovies = async () => {
	try {
		const { data, error } = await supabase
			.from("movies_movie")
			.select("id, title, year, status, image_url, link_url");

		if (error) {
			throw new Error(`Supabase error: ${error.message}`);
		}

		return data;
	} catch (error) {
		console.error("Error fetching movies:", error);
		throw new Error("Failed to fetch movies");
	}
};
