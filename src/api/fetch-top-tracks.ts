import type { TopTracksI } from "~/types/Spotify";

export const fetchTopTracks = async () =>
  await $fetch<TopTracksI>(
    "https://kp4w175kk5.execute-api.eu-north-1.amazonaws.com/prod-api",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
