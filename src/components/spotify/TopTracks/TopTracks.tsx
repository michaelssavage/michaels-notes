import { fetchTopTracks } from "@/api/fetch-top-tracks";
import { Anchor } from "@/components/Anchor";
import type { ITopTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { Comp, Title, TrackNames } from "./TopTracks.styled";

export const TopTracks = () => {
  const { data, isLoading } = useQuery<Array<ITopTrack>>({
    queryKey: ["top-tracks"],
    queryFn: fetchTopTracks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No tracks available</div>;
  }

  return (
    <Comp>
      <Title>Most played tracks:</Title>

      <TrackNames>
        {data.map((track, index) => {
          return (
            <li key={track.name}>
              <Anchor
                text={`${track.name} by ${track.artists}`}
                variant="link"
                link={track.url}
                isExternal
              />
              {index !== data.length - 1 ? <span> // </span> : null}
            </li>
          );
        })}
      </TrackNames>
    </Comp>
  );
};
