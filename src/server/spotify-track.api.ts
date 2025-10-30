// ~/server/getSpotifyTrack.ts
import { getSpotifyToken } from "@/server/spotify-token.api";
import type {
  IPlayTrack,
  IPlayTrackResponse,
  IRecentTrackResponse,
} from "@/types/Spotify";
import { createServerFn } from "@tanstack/react-start";

export const getSpotifyTrack = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const { access_token } = await getSpotifyToken();

      const currentRes = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      // If no song playing (204), fall back to recently played
      if (currentRes.status === 204 || !currentRes.ok) {
        const recentRes = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          { headers: { Authorization: `Bearer ${access_token}` } }
        );

        if (!recentRes.ok) {
          throw new Error(
            `Failed to fetch recent track: ${await recentRes.text()}`
          );
        }

        const recentData: IRecentTrackResponse = await recentRes.json();
        const lastPlayed = recentData.items[0];

        if (!lastPlayed) return { isPlaying: false };

        return {
          isPlaying: false,
          trackTitle: lastPlayed.track.name,
          artist: lastPlayed.track.artists.map((a) => a.name).join(", "),
          albumArtUrl: lastPlayed.track.album.images[0]?.url || null,
          trackUrl: lastPlayed.track.external_urls.spotify,
          preview: lastPlayed.track.preview_url,
        } as IPlayTrack;
      }

      // If something is playing
      const currentData: IPlayTrackResponse = await currentRes.json();

      return {
        isPlaying: currentData.is_playing,
        trackTitle: currentData.item.name,
        artist: currentData.item.artists.map((a) => a.name).join(", "),
        albumArtUrl: currentData.item.album.images[0]?.url || null,
        trackUrl: currentData.item.external_urls.spotify,
        preview: currentData.item.preview_url,
      } as IPlayTrack;
    } catch (err) {
      console.error("Error fetching Spotify track:", err);
      throw new Error("Internal server error");
    }
  }
);
