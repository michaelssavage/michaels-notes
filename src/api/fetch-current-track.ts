import type {
	IPlayTrack,
	IPlayTrackResponse,
	IRecentTrackResponse,
} from "@/types/Spotify";

export const fetchCurrentTrack = async (): Promise<IPlayTrack> => {
	const response = await fetch(
		"https://api.spotify.com/v1/me/player/currently-playing",
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("spotifyAccessToken")}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch current track");
	}

	if (response.status === 204) {
		return { isPlaying: false };
	}

	const data: IPlayTrackResponse = await response.json();
	return {
		isPlaying: data.is_playing,
		trackTitle: data.item.name,
		artist: data.item.artists.map((artist) => artist.name).join(", "),
		albumArtUrl: data.item.album.images[0].url,
		trackUrl: data.item.external_urls.spotify,
		preview: data.item.preview_url,
	};
};

export const fetchRecentTrack = async (): Promise<IPlayTrack> => {
	const response = await fetch(
		"https://api.spotify.com/v1/me/player/recently-played?limit=1",
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("spotifyAccessToken")}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch recent track");
	}

	const data: IRecentTrackResponse = await response.json();
	const lastPlayed = data.items[0];
	return {
		isPlaying: false,
		trackTitle: lastPlayed.track.name,
		artist: lastPlayed.track.artists.map((artist) => artist.name).join(", "),
		albumArtUrl: lastPlayed.track.album.images[0].url,
		trackUrl: lastPlayed.track.external_urls.spotify,
		preview: lastPlayed.track.preview_url,
	};
};
