import { useState } from "react";
import { Badge, Group, Paper, Text, Title } from "@mantine/core";
import { CardModal } from "../CardModal/CardModal";

const badges = ["Next.js", "TypeScript", "SCSS", "NPM", "Bootstrap"];

const description = `Plant Bass'd has had more than 20 shows in Edinburgh, Glasgow, and Dublin giving
platforms to up and coming artists alongside international acts. Our Fresh Juice
series has seen us cover more than 50 new music releases that we found interesting,
and we started to premiere new releases on our Soundcloud too.`;

export const Plantbassd = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <CardModal
        title="Plant Bass'd"
        badges={badges}
        imgSrc="plant.png"
        description={description}
        link="plantbassd.com"
        opened={opened}
        setOpened={setOpened}
      />

      <Paper shadow="sm" p="sm" withBorder className="card" onClick={() => setOpened(true)}>
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
          <Text>
            A lockdown project that started as a way to share music interests but evolved into an
            electronic music blog sharing news about new music, events, and gigs
          </Text>
        </div>
      </Paper>
    </>
  );
};
