import { Badge, Collapse, Group, Paper, Text, Title } from "@mantine/core";
import { useState } from "react";
import { ExternalLink } from "components/ExternalLink";

export const CommonMovies = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Paper
      shadow="sm"
      p="sm"
      withBorder
      className={opened ? "openCard" : "card"}
      onClick={() => setOpened(!opened)}
    >
      <Group position="apart" style={{ gap: "0.25rem" }}>
        <Title order={4}>Common Movies</Title>
        <Badge color="pink" variant="light">
          Python
        </Badge>
      </Group>
      <Text>A CLI that returns common movies from Letterboxd user's watchlists</Text>

      <Collapse in={opened} mt="xs">
        <Text>
          I am a huge fan of Letterboxd and use it as a movie tracker and sort of social media.
          Unfortunately the Letterboxd API is in Beta and hard to get access to...
        </Text>

        <Text mt="xs">
          I forked an existing project and updated it to be Object Oriented. As well as listing
          common films between users, It will also pick a random movie for you from the users
          watchlists.
        </Text>

        <Text mt="xs">
          Visit the Github Repo:{" "}
          <ExternalLink
            url="https://github.com/michaelssavage/common-movies"
            name="Common Movies"
            inline
          />
        </Text>
      </Collapse>
    </Paper>
  );
};
