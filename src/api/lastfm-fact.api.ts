const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

export const getFact = async (artist: string) => {
	const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

	const url = `${BASE_URL}?method=artist.getinfo&artist=${encodeURIComponent(
		artist,
	)}&api_key=${API_KEY}&format=json`;

	const res = await fetch(url);
	if (!res.ok) throw new Error("Failed to fetch artist info");

	const data = await res.json();

	return data.artist?.bio?.summary || "No bio found.";
};
