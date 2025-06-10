import type { LastFmArtistInfo } from "@/types/Lastfm";

export const getFact = async (artist: string): Promise<LastFmArtistInfo> => {
	const response = await fetch(
		`/.netlify/functions/get-lastfm-fact?artist=${encodeURIComponent(artist)}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch lastfm track");
	}

	const data = await response.json();
	return data;
};
