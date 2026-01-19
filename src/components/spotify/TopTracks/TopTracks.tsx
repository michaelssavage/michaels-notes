import { ExternalLinkIcon } from "@/components/icons";
import { Scroll } from "@/components/molecules/Scroll";
import { getContrastYIQ, getRandomColor } from "@/lib/colors";
import { getTopTracks } from "@/server/top-tracks.api";
import type { ITopTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo } from "react";
import { ArtistName, Card, TrackName } from "./TopTracks.styled";

const TopTracks = () => {
  const topTracksFn = useServerFn(getTopTracks);

  const { data, isLoading } = useQuery<Array<ITopTrack>>({
    queryKey: ["top-tracks"],
    queryFn: topTracksFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const trackColors = useMemo(() => {
    if (!data) return new Map();

    return new Map(
      data.map((track) => {
        const color = getRandomColor();
        return [track.name, { color, contrastColor: getContrastYIQ(color) }];
      }),
    );
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length === 0 || !Array.isArray(data)) {
    return <div>No tracks available</div>;
  }

  return (
    <Scroll title="Most played tracks">
      {data.map((track) => {
        const { color, contrastColor } = trackColors.get(track.name)!;

        return (
          <Card
            key={track.name}
            to={track.url}
            color={color}
            contrastColor={contrastColor}
          >
            <ExternalLinkIcon />
            <TrackName>{track.name}</TrackName>
            <ArtistName>{track.artists}</ArtistName>
          </Card>
        );
      })}
    </Scroll>
  );
};

export default TopTracks;
