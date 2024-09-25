import { fetchCurrentTrack, fetchRecentTrack } from "@/api/fetch-current-track";
import type { IPlayTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { Comp, NowPlaying } from "./CurrentPlay.styled";

export const CurrentPlay = () => {
  const currentTrack = useQuery<IPlayTrack>({
    queryKey: ["currentTrack"],
    queryFn: fetchCurrentTrack,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const recentTrack = useQuery<IPlayTrack>({
    queryKey: ["recentTrack"],
    queryFn: fetchRecentTrack,
    enabled: !currentTrack?.data?.isPlaying,
  });

  if (currentTrack?.isLoading || recentTrack?.isLoading)
    return <div>Loading...</div>;

  const trackData = currentTrack?.data?.isPlaying
    ? currentTrack?.data
    : recentTrack?.data;

  return (
    <Comp>
      <h2>{trackData?.isPlaying ? "Now Playing" : "Recently Played"}</h2>
      {trackData && (
        <NowPlaying>
          <img
            src={trackData.albumArtUrl}
            alt="Album Art"
            style={{ width: "200px", height: "200px" }}
          />
          <div>
            <h3>{trackData.trackTitle}</h3>
            <p>{trackData.artist}</p>
          </div>
        </NowPlaying>
      )}
    </Comp>
  );
};
