import { getAccessToken } from "~/composables/Spotify/getAccessToken";
import { getTopTracks } from "~/composables/Spotify/getTopTracks";

export default defineEventHandler(async (_event) => {
  const { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } =
    useRuntimeConfig();

  try {
    const { access_token } = await getAccessToken(
      spotifyClientId,
      spotifyClientSecret,
      spotifyRefreshToken
    );
    return await getTopTracks(access_token);
  } catch (err) {
    console.error(err);
    console.log("Error returning tracks");
  }
});
