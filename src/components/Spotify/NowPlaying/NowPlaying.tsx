import { Card, Flex, Group, Image, Text } from "@mantine/core";
import useSWR from "swr";
import { NOW_PLAYING_ENDPOINT } from "utils/constants";
import { getNowPlaying } from "api/spotify";
import { AnimatedBars } from "components/Spotify";
import { NowPlayingProps } from "utils/spotify-types";
import { SpotifyIcon } from "components/Icons";

export const NowPlaying = () => {
  const { data } = useSWR<NowPlayingProps>(NOW_PLAYING_ENDPOINT, getNowPlaying);

  return (
    <section>
      <h2>What Am I Listening To?</h2>
      <Card shadow="sm" p="xs" withBorder>
        {data?.songUrl ? (
          <Group>
            <Image radius="md" src={data.albumImageUrl} alt="spotify logo" width={100} />
            <AnimatedBars />
            <Flex direction="column" wrap="wrap">
              <Text weight={800}>
                {data.artist} - {data.title}
              </Text>
              <Text weight={500}>Album: {data.album}</Text>
            </Flex>
          </Group>
        ) : (
          <Group>
            <SpotifyIcon />
            <Text weight={800}>Nothing Currently </Text>
          </Group>
        )}
      </Card>
    </section>
  );
};
