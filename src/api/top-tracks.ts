import { getAccessToken } from "@/api/access-token";
import type { ITopTrack, ITopTrackResponse } from "@/types/Spotify";

export const fetchTopTracks = async (): Promise<Array<ITopTrack>> => {
	const accessToken = await getAccessToken();
	const response = await fetch(
		"https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch top tracks");
	}

	const data: ITopTrackResponse = await response.json();
	return data.items.map((item) => ({
		name: item.name,
		artists: item.artists.map((artist) => artist.name).join(", "),
		url: item.external_urls.spotify,
		img: item.album.images[0].url,
	}));
};
