import { Flex, Group, Image, Paper, Text, Title } from "@mantine/core";
import useSWR from "swr";
import { NOW_PLAYING_ENDPOINT } from "utils/constants";
import { getNowPlaying } from "api/spotify";
import { AnimatedBars } from "components/Interests/Spotify";
import { NowPlayingProps } from "utils/spotify-types";
import { SpotifyIcon } from "components/Icons";

export const NowPlaying = () => {
  const { data } = useSWR<NowPlayingProps>(NOW_PLAYING_ENDPOINT, getNowPlaying);

  return (
    <Paper shadow="md" p="md" withBorder>
      <Title order={2}>What Am I Listening To?</Title>
      <Group style={{ marginTop: "0.5rem" }}>
        {data?.songUrl ? (
          <Flex justify="center" gap="xs">
            <Image radius="md" src={data.albumImageUrl} alt="spotify logo" width={100} />
            <Flex direction="row" align="center" gap="xs">
              <AnimatedBars />
              <Flex direction="column" wrap="wrap">
                <Text weight={800} size="sm" lineClamp={1}>
                  {data.artist} - {data.title}
                </Text>
                <Text size="sm" lineClamp={1}>
                  {data.album}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <>
            <SpotifyIcon />
            <Text weight={800}>Nothing Currently </Text>
          </>
        )}
      </Group>
    </Paper>
  );
};
