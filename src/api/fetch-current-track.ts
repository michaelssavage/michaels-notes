import type { CurrentTrackI } from "~/types/Spotify";

export const fetchCurrentTrack = async () =>
  await $fetch<CurrentTrackI>(
    "https://kp4w175kk5.execute-api.eu-north-1.amazonaws.com/prod-api/current",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
