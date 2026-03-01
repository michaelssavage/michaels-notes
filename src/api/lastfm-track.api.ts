import { LastFmArtistInfo } from "@/types/Lastfm";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { z } from "zod";

const TrackSchema = z.object({
  artist: z.string().min(1),
});

export const getLastFmTrack = createServerFn({ method: "GET" })
  .inputValidator(TrackSchema)
  .handler(async ({ data }): Promise<LastFmArtistInfo> => {
    if (!data.artist) {
      throw new Error("Missing 'artist' query parameter");
    }

    const API_KEY = env.VITE_LASTFM_API_KEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${data.artist}&api_key=${API_KEY}&format=json`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "michaelsavage.ie/1.0 (Last.fm integration)",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch from Last.fm");
      }

      const data: LastFmArtistInfo = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching Last.fm track:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      throw new Error(errorMessage);
    }
  });
