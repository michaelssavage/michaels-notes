import { useState } from "react";
import { Badge, Group, Paper, Text, Title } from "@mantine/core";
import { CardModal } from "components/Home";

const badges = ["React", "gh-pages", "SCSS", "NPM", "Bootstrap"];

const description = `That's Savage can print on clothes, bottles, umbrellas, you name it. As well as
printing, They can design logos, images, and other graphic design needs. The site is
built in React.`;

export const ThatsSavage = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <CardModal
        title="That's Savage"
        badges={badges}
        imgSrc="savage.png"
        description={description}
        link="thatssavage.ie"
        opened={opened}
        setOpened={setOpened}
      />

      <Paper shadow="sm" p="sm" withBorder className="card" onClick={() => setOpened(true)}>
        <Group position="apart">
          <Title order={3}>That's Savage</Title>
          <Badge color="pink" variant="light">
            React
          </Badge>
        </Group>
        <Text>
          A printing company capable of graphic design and ink printing of clothes, garments, items
          & more
        </Text>
      </Paper>
    </>
  );
};
