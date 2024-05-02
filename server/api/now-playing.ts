import { useFetch } from "nuxt/app";
import { transformNowPlaying } from "~/composables/transformNowPlaying";
import type {
  AccessTokenI,
  GetNowPlayingResponse,
  GetNowPlayingTransformed,
  NotPlayingI,
} from "~/types/Spotify";

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

  const getNowPlaying = async (): Promise<
    GetNowPlayingTransformed | NotPlayingI
  > => {
    try {
      const { value } = await getAccessToken();
      const { data: res } = await useFetch<GetNowPlayingResponse>(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${value?.access_token}`,
          },
        }
      );

      if (!res || !res.value?.item) return { isPlaying: false };
      return transformNowPlaying(res.value);
    } catch (err) {
      return { isPlaying: false };
    }
  };

  return getNowPlaying();
});
