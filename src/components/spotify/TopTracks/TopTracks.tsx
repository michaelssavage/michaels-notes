import { fetchTopTracks } from "@/api/fetch-top-tracks";
import { Anchor } from "@/components/Anchor";
import type { ITopTrack } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import styles from "./TopTracks.module.scss";

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
    <div className={styles.comp}>
      <h2 className={styles.title}>Most played tracks:</h2>

      <ol className={styles.trackNames}>
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
      </ol>
    </div>
  );
};
