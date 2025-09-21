import type { Handler } from "@netlify/functions";
import type { IPlayTrackResponse } from "../../src/types/Spotify";

const handler: Handler = async (event, _context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "text/plain",
      },
      body: "",
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const REFRESH_TOKEN = process.env.VITE_SPOTIFY_REFRESH_TOKEN;
  const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
      },
      body: JSON.stringify({ error: "Missing Spotify credentials" }),
    };
  }

  try {
    // First, get a fresh access token
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: REFRESH_TOKEN,
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error("Failed to refresh token:", await tokenResponse.text());
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
        },
        body: JSON.stringify({ error: "Failed to refresh token" }),
      };
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
        },
        body: JSON.stringify({ error: "No access token received" }),
      };
    }

    // Now fetch the current track
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Failed to fetch current track:", errorData);
      return {
        statusCode: res.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
        },
        body: JSON.stringify({ error: "Failed to fetch current track" }),
      };
    }

    // Handle 204 No Content (no track currently playing)
    if (res.status === 204) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
        },
        body: JSON.stringify({ isPlaying: false }),
      };
    }

    const trackData: IPlayTrackResponse = await res.json();

    const transformedTrack = {
      isPlaying: trackData.is_playing,
      trackTitle: trackData.item.name,
      artist: trackData.item.artists.map((artist) => artist.name).join(", "),
      albumArtUrl: trackData.item.album.images[0]?.url || null,
      trackUrl: trackData.item.external_urls.spotify,
      preview: trackData.item.preview_url,
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
      },
      body: JSON.stringify(transformedTrack),
    };
  } catch (error) {
    console.error("Error in current-track function:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
      },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

export { handler };
