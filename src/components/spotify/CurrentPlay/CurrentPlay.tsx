import { fetchCurrentTrack, fetchRecentTrack } from "@/api/fetch-current-track";
import { Picture } from "@/components/Picture";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { Comp, NowPlaying, Title } from "./CurrentPlay.styled";

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
      <Title>
        {trackData?.isPlaying ? "Now Playing:" : "Recently Played:"}
      </Title>
      {trackData && (
        <NowPlaying>
          {trackData.albumArtUrl ? (
            <Picture
              src={trackData.albumArtUrl}
              alt="Album Art"
              ar="1"
              style={css`
                width: 120px;
              `}
            />
          ) : null}
          <div>
            <h3>{trackData.trackTitle}</h3>
            <p>{trackData.artist}</p>
          </div>
        </NowPlaying>
      )}
    </Comp>
  );
};
