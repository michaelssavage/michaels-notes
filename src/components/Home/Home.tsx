import { Grid, Text, Title } from "@mantine/core";
import { NowPlaying } from "components/Interests/Spotify";
import { InfoCard } from "./InfoCard/InfoCard";

export const Home = () => {
  return (
    <Grid>
      <Grid.Col span={8}>
        <Title order={1}>Michael Savage</Title>

        <Text>
          Hey, I'm Michael, a Software Developer at Jaguar Land Rover, Ireland. I'm passionate about
          all things music, movies, sports, and travelling. I am always striving to learn new and
          exciting technologies with particular interests in Frontend Development, APIs, and UI/UX.
        </Text>

        <NowPlaying />
      </Grid.Col>
      <Grid.Col span={4}>
        <InfoCard />
      </Grid.Col>
    </Grid>
  );
};
