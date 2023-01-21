import { Grid, Paper, Text, Title } from "@mantine/core";
import { NowPlaying } from "components/Interests/Spotify";
import { InfoCard } from "components/InfoCard";
import { Dogs } from "components/Dogs";
import { Col } from "components/Layout";
import { CommonMovies, Emot, OrderSystem, Plantbassd, Rekordbox, ThatsSavage } from "./";

export const Home = () => {
  return (
    <Grid>
      <Grid.Col span={8}>
        <Title size="6rem">Michael Savage</Title>
        <Paper shadow="md" p="md" withBorder mt="xs">
          <Text>
            Hey, I'm Michael, a Software Developer at Jaguar Land Rover, Ireland. I'm passionate
            about all things music, movies, sports, and travelling. Proficient in React, Typescript,
            Java, Spring Boot, Python but I am always striving to learn new and exciting
            technologies with particular interests in Frontend Development, APIs, and UI/UX.
          </Text>
        </Paper>
        <Grid mt="xs">
          <Grid.Col span={7}>
            <Plantbassd />
          </Grid.Col>
          <Grid.Col span={5}>
            <ThatsSavage />
          </Grid.Col>

          <Grid.Col span="auto">
            <Col>
              <Rekordbox />
              <CommonMovies />
            </Col>
          </Grid.Col>

          <Grid.Col span={6}>
            <Emot />
          </Grid.Col>

          <Grid.Col span={12}>
            <NowPlaying />
          </Grid.Col>
          <Grid.Col span={5}>
            <Dogs />
          </Grid.Col>

          <Grid.Col span={7}>
            <OrderSystem />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={4}>
        <InfoCard />
      </Grid.Col>
    </Grid>
  );
};
