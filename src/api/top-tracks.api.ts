import { getSpotifyToken } from "@/api/spotify-token.api";
import { ITopTrack, ITopTrackResponse } from "@/types/Spotify";
import { createServerFn } from "@tanstack/react-start";

export const getTopTracks = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<ITopTrack>> => {
    try {
      const { access_token } = await getSpotifyToken();

      const res = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch top tracks");
      }

      const tracksData: ITopTrackResponse = await res.json();

      const transformedTracks = tracksData.items.map((item) => ({
        name: item.name,
        artists: item.artists.map(({ name }) => name).join(", "),
        url: item.external_urls.spotify,
        img: item.album.images[0]?.url || null,
      }));

      return transformedTracks;
    } catch (err) {
      console.error("Error fetching favourite tracks:", err);
      throw new Error("Internal server error");
    }
  }
);
