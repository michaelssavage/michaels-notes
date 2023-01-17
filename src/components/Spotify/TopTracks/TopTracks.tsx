import useSWR from "swr";
import { Image, SimpleGrid, Text } from "@mantine/core";
import { TOP_TRACKS_ENDPOINT } from "utils/constants";
import { getTopTracks } from "api/spotify";
import { TopTracksProps } from "utils/spotify-types";

export const TopTracks = () => {
  const { data } = useSWR<TopTracksProps[]>(TOP_TRACKS_ENDPOINT, getTopTracks);

  return (
    <section>
      <h2>Music</h2>

      <Text>My Favourite Tracks pulled from Spotify</Text>

      <SimpleGrid cols={6} style={{ margin: "1rem 0" }}>
        {data &&
          data.map((track: TopTracksProps) => (
            <div
              key={track.songUrl}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Image
                radius="md"
                src={track.albumImageUrl}
                alt={`${track.title} album art`}
                width={200}
              />
              <Text style={{ marginTop: "1rem" }}>
                {track.artist} - {track.title}
              </Text>
            </div>
          ))}
      </SimpleGrid>
    </section>
  );
};
