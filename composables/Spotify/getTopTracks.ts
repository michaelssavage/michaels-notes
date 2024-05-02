import type { SpotifyTopTracksI } from "./Types";

export const getTopTracks = async (accessToken: string) => {
  return await $fetch<SpotifyTopTracksI>(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
