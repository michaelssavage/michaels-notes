import { Badge, Grid, Group, Image, Paper, Text, Title } from "@mantine/core";
import { NowPlaying } from "components/Interests/Spotify";
import { InfoCard } from "./InfoCard/InfoCard";

export const Home = () => {
  return (
    <Grid>
      <Grid.Col span={8}>
        <Title size="6rem">Michael Savage</Title>
        <Paper shadow="md" p="md" withBorder mt="xs">
          <Text>
            Hey, I'm Michael, a Software Developer at Jaguar Land Rover, Ireland. I'm passionate
            about all things music, movies, sports, and travelling. I am always striving to learn
            new and exciting technologies with particular interests in Frontend Development, APIs,
            and UI/UX.
          </Text>
        </Paper>
        <Grid mt="xs">
          <Grid.Col span={7}>
            <Paper shadow="sm" p="sm" withBorder>
              <Group position="apart">
                <Title order={3}>Plant Bass'd</Title>
                <Badge color="pink" variant="light">
                  Next.js
                </Badge>
              </Group>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Image radius="md" src="plant.png" width={350} alt="plant bass'd logo" />
                <Text>
                  A lockdown project that started as a way to share music interests but evolved into
                  an electronic music blog sharing news about new music, events, and throwing
                  parties.
                </Text>
              </div>
            </Paper>
          </Grid.Col>
          <Grid.Col span={5}>
            <Paper shadow="sm" p="sm" withBorder>
              <Group position="apart">
                <Title order={3}>That's Savage</Title>
                <Badge color="pink" variant="light">
                  React
                </Badge>
              </Group>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Image src="savage.png" width={180} alt="that's savage logo" />
                <Text>
                  A printing company capable of graphic design and ink printing of clothes,
                  garments, items & more
                </Text>
              </div>
            </Paper>
          </Grid.Col>

          <Grid.Col span="auto">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Paper shadow="sm" p="sm" withBorder>
                <Group position="apart">
                  <Title order={4}>Rekordbox Prettify</Title>
                  <Badge color="pink" variant="light">
                    Python
                  </Badge>
                </Group>
                <Text>An .exe file that prettifies exported .txt files from Rekordbox.</Text>
              </Paper>

              <Paper shadow="sm" p="sm" withBorder>
                <Group position="apart" style={{ gap: "0.25rem" }}>
                  <Title order={4}>Common Movies</Title>
                  <Badge color="pink" variant="light">
                    Python
                  </Badge>
                </Group>
                <Text>
                  A CLI that retrieves Letterboxd user's watchlists and returns the movies in common
                </Text>
              </Paper>
            </div>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper shadow="sm" p="sm" withBorder>
              <Group position="apart">
                <Title order={3}>Emot</Title>
                <Badge color="pink" variant="light">
                  PYQT5
                </Badge>
              </Group>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Image src="icon.png" width={480} alt="Emot logo" />
                <Text>
                  My 4th Year project was a customisable client based emotion classifier. The system
                  uses data extraction, natural language processing, emotion classification, and
                  machine learning to judge the sentiment of textual material being read online by a
                  user.
                </Text>
              </div>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
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
