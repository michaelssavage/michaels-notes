import { useFetch } from "nuxt/app";
import type { AccessTokenI, SpotifyTopTracksI } from "~/types/Spotify";

export default defineEventHandler(async (_event) => {
  const { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } =
    useRuntimeConfig();
  const basic = Buffer.from(
    `${spotifyClientId}:${spotifyClientSecret}`
  ).toString("base64");

  const headers = {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const getAccessToken = async () => {
    const { data } = await useFetch<AccessTokenI>(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: headers,
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: spotifyRefreshToken,
        }).toString(),
      }
    );
    return data;
  };

  const getTopTracks = async () => {
    const { value } = await getAccessToken();

    return useFetch<SpotifyTopTracksI>(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
      {
        headers: {
          Authorization: `Bearer ${value?.access_token}`,
        },
      }
    );
  };

  try {
    const { data } = await getTopTracks();
    return data.value;
  } catch (err) {
    console.log("Error returning tracks");
  }
});
