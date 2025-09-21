import type { IPlayTrack } from "@/types/Spotify";

export const fetchCurrentTrack = async (): Promise<IPlayTrack> => {
  const response = await fetch("/.netlify/functions/get-current-track");

  if (!response.ok) {
    throw new Error("Failed to fetch current track");
  }

  const data: IPlayTrack = await response.json();
  return data;
};

export const fetchRecentTrack = async (): Promise<IPlayTrack> => {
  const response = await fetch("/.netlify/functions/get-recent-track");

  if (!response.ok) {
    throw new Error("Failed to fetch recent track");
  }

  const data: IPlayTrack = await response.json();
  return data;
};
