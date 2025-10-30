import { createServerFn } from "@tanstack/react-start";

const REFRESH_TOKEN = process.env.VITE_SPOTIFY_REFRESH_TOKEN;
const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;

export const getSpotifyToken = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Missing Spotify credentials");
      }

      const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
        "base64"
      );

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
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();

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
