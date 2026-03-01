import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export const getSpotifyToken = createServerFn({ method: "GET" }).handler(
  async () => {
    const REFRESH_TOKEN = env.VITE_SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = env.VITE_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = env.VITE_SPOTIFY_CLIENT_SECRET;

    try {
      if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Missing Spotify credentials");
      }

      // Use Web API base64 encoding to avoid Node Buffer runtime differences.
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
        const body = await response.text();
        throw new Error(
          `Failed to refresh token (${response.status}): ${body || "empty response"}`
        );
      }

      const data: { access_token: string; expires_in: number } =
        await response.json();

      if (!data.access_token) {
        throw new Error("No access token received");
      }

      return {
        access_token: data.access_token,
        expires_at: Date.now() + data.expires_in * 1000,
      };
    } catch (error) {
      console.error("Error refreshing Spotify token:", error);
      throw new Error("Internal server error");
    }
  }
);
