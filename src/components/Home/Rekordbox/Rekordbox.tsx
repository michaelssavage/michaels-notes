import { Badge, Collapse, Group, Paper, Text, Title } from "@mantine/core";
import { useState } from "react";
import { ExternalLink } from "components/ExternalLink";

export const Rekordbox = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Paper
      shadow="sm"
      p="sm"
      withBorder
      className={opened ? "openCard" : "card"}
      onClick={() => setOpened(!opened)}
    >
      <Group position="apart">
        <Title order={4}>Rekordbox Prettify</Title>
        <Badge color="pink" variant="light">
          Python
        </Badge>
      </Group>
      <Text>An executable file that prettifies exported .txt files from Rekordbox.</Text>

      <Collapse in={opened} mt="xs">
        <Text>
          Created a really simple .exe file using Pyinstaller to help export setlists from the DJ
          Software Rekordbox.
        </Text>

        <Text mt="xs">
          Visit the Github Repo:{" "}
          <ExternalLink
            url="https://github.com/michaelssavage/Rekordbox-Mix-Setlist"
            name="Rekordbox Mix Setlist"
            inline
          />
        </Text>
      </Collapse>
    </Paper>
  );
};
