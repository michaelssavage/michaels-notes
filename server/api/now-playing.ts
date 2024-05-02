import type {
  GetNowPlayingTransformed,
  NotPlayingI,
} from "~/composables/Spotify/Types";
import { getAccessToken } from "~/composables/Spotify/getAccessToken";
import {
  getNowPlaying,
  transformNowPlaying,
} from "~/composables/Spotify/getNowPlaying";

export default defineEventHandler(
  async (_event): Promise<GetNowPlayingTransformed | NotPlayingI> => {
    const { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } =
      useRuntimeConfig();
    try {
      const { access_token } = await getAccessToken(
        spotifyClientId,
        spotifyClientSecret,
        spotifyRefreshToken
      );
      const res = await getNowPlaying(access_token);
      if (!res || !res.item) return { isPlaying: false };
      return transformNowPlaying(res);
    } catch (err) {
      return { isPlaying: false };
    }
  }
);
