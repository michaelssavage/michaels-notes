import { Card, Flex, Group, Image, Text } from "@mantine/core";
import useSWR from "swr";
import { NOW_PLAYING_ENDPOINT } from "utils/constants";
import { getNowPlaying } from "api/spotify";
import { AnimatedBars, SpotifyIcon } from "components/Spotify";
import { NowPlayingProps } from "utils/spotify-types";
import styles from "../spotify.module.scss";

export const NowPlaying = () => {
  const { data } = useSWR<NowPlayingProps>(NOW_PLAYING_ENDPOINT, getNowPlaying);

  return (
    <section>
      <h2 className="header3">What Am I Listening To?</h2>
      {data?.songUrl ? (
        <Card shadow="sm" p="xs" withBorder>
          <Group>
            <Image radius="md" src={data.albumImageUrl} alt="spotify logo" width={100} />
            <AnimatedBars />
            <Flex direction="column" wrap="wrap">
              <Text weight={500}>
                {data.artist} - {data.title}
              </Text>
              <Text weight={500}>{data.album}</Text>
            </Flex>
          </Group>
        </Card>
      ) : (
        <div className={styles.notPlaying}>
          <SpotifyIcon />
          <p>Nothing Currently </p>
        </div>
      )}
    </section>
  );
};
