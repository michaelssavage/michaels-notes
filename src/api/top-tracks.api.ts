import type { ITopTrack } from "@/types/Spotify";

export const fetchTopTracks = async (): Promise<Array<ITopTrack>> => {
  const response = await fetch("/.netlify/functions/get-top-tracks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  return data;
};
