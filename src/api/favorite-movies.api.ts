export const fetchFavouriteMovies = async () => {
	const token = import.meta.env.VITE_LETTERBOXD_BEARER_TOKEN;

	const response = await fetch("/.netlify/functions/movies", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token ?? process.env.VITE_LETTERBOXD_BEARER_TOKEN}`,
		},
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data;
};
