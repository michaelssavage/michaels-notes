import { setResponseStatus } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";

// Spotify refresh tokens now expire after a fixed lifetime (currently 180 days,
// see the app dashboard). When this starts failing with invalid_grant, redo the
// authorization flow in spotify-developer-api.mdx to mint a new refresh token.
export async function getSpotifyToken() {
  const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;
  const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

  try {
    if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
      setResponseStatus(500);
      throw new Error("Missing Spotify credentials");
    }

    const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      setResponseStatus(response.status);
      const body = await response.text();
      throw new Error(
        `Failed to refresh token (${response.status}): ${body || "empty response"}`,
      );
    }

    const data: { access_token: string; expires_in: number } =
      await response.json();

    if (!data.access_token) {
      setResponseStatus(500);
      throw new Error("No access token received");
    }

    return {
      access_token: data.access_token,
      expires_at: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    setResponseStatus(500);
    throw new Error("Internal server error");
  }
}
