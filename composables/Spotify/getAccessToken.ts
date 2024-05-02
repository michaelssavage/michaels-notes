import type { AccessTokenI } from "./Types";

export const getAccessToken = async (
  spotifyClientId: string,
  spotifyClientSecret: string,
  spotifyRefreshToken: string
) => {
  const basic = Buffer.from(
    `${spotifyClientId}:${spotifyClientSecret}`
  ).toString("base64");

  const headers = {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return await $fetch<AccessTokenI>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: headers,
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: spotifyRefreshToken,
    }).toString(),
  });
};
