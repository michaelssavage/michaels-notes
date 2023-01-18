import { Card, Grid, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { NowPlaying } from "components/Interests/Spotify";
import { InfoCard } from "./InfoCard/InfoCard";

export const Home = () => {
  return (
    <Grid>
      <Grid.Col span={8}>
        <Title size="5rem">Michael Savage</Title>
        <Paper shadow="md" p="md" withBorder style={{ marginTop: "1rem" }}>
          <Text>
            Hey, I'm Michael, a Software Developer at Jaguar Land Rover, Ireland. I'm passionate
            about all things music, movies, sports, and travelling. I am always striving to learn
            new and exciting technologies with particular interests in Frontend Development, APIs,
            and UI/UX.
          </Text>
        </Paper>
        <Grid style={{ marginTop: "1rem" }}>
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" withBorder>
              <Title order={2}>Plantbass'd</Title>
              <Text>
                Party Throwers and electronic music blog sharing news about new music, events, and
                all things plant bass'd
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" withBorder>
              <Title order={2}>That's Savage</Title>
              <Text>
                Family member's printing company capable graphic design and ink printing of clothes,
                garments, items and more
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" withBorder>
              <Title order={2}>Emot</Title>
              <Text>
                4th Year project that classified the user's emotions based off of the reading online
                material they consumed
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={8}>
            <NowPlaying />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={4}>
        <InfoCard />
      </Grid.Col>
    </Grid>
  );
};
