import { fetchCurrentTrack, fetchRecentTrack } from "@/api/fetch-current-track";
import { Picture } from "@/components/Picture";
import useExtractColor from "@/lib/extractColor";
import type { IPlayTrack } from "@/types/Spotify";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

  const trackData = currentTrack?.data?.isPlaying
    ? currentTrack?.data
    : recentTrack?.data;

  const { dominantColor } = useExtractColor(trackData?.albumArtUrl || "");

  // Memoize the color extraction result
  const memoizedColor = useMemo(() => dominantColor, [dominantColor]);

  if (currentTrack?.isLoading || recentTrack?.isLoading)
    return <div>Loading...</div>;

  console.log(memoizedColor);

  return (
    <Comp>
      <Title>
        {trackData?.isPlaying ? "Now Playing:" : "Recently Played:"}
      </Title>
      {trackData && (
        <NowPlaying color={dominantColor ?? ""}>
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
