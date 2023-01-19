import { Badge, Flex, Group, Image, Paper, Text, Title } from "@mantine/core";
import useSWR from "swr";
import { NOW_PLAYING_ENDPOINT } from "utils/constants";
import { getNowPlaying } from "api/spotify";
import { AnimatedBars } from "components/Interests/Spotify";
import { NowPlayingProps } from "utils/spotify-types";
import { SpotifyIcon } from "components/Icons";

export const NowPlaying = () => {
  const { data } = useSWR<NowPlayingProps>(NOW_PLAYING_ENDPOINT, getNowPlaying);

  return (
    <Paper shadow="sm" p="sm" withBorder>
      <Group position="apart">
        <Title order={3}>What Am I Listening To?</Title>
        <Badge color="pink" variant="light">
          Spotify API
        </Badge>
      </Group>
      <Group style={{ marginTop: "0.5rem" }}>
        {data?.isPlaying ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <Image src={data.albumImageUrl} alt="spotify logo" width={90} />
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
          </div>
        ) : (
          <>
            <SpotifyIcon size={90} />
            <Text weight={800}>Nothing Currently </Text>
          </>
        )}
      </Group>
    </Paper>
  );
};
