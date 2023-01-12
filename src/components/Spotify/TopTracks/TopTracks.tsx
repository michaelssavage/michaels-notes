import useSWR from "swr";
import { TOP_TRACKS_ENDPOINT } from "utils/constants";
import { getTopTracks } from "api/spotify";
import { TopTracksProps } from "utils/spotify-types";

export const TopTracks = () => {
  const { data } = useSWR<TopTracksProps[]>(TOP_TRACKS_ENDPOINT, getTopTracks);

  return (
    <section>
      <h2 className="header3">What Are My Favourite Tracks?</h2>
      {data &&
        data.map((track: TopTracksProps) => (
          <li key={track.songUrl}>
            {track.artist} - {track.title}
          </li>
        ))}
    </section>
  );
};
