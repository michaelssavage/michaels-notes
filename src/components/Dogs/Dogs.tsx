import { Badge, Collapse, Group, Image, Paper, Text, Title } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import { getDogPic } from "api/dogs";

interface DogProps {
  url: string;
  width: string;
  height: string;
}

export const Dogs = () => {
  const { data } = useSWR<DogProps>("https://api.thedogapi.com/v1/images/search", getDogPic);
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
        <Title order={3}>Dog API</Title>
        <Badge color="pink" variant="light">
          REST
        </Badge>
      </Group>
      <Text>Here, have a free picture of a dog</Text>
      <Collapse in={opened} mt="xs">
        <div style={{ marginLeft: "auto", marginRight: "auto", width: "75%" }}>
          {data && (
            <Image
              src={data.url}
              width="100%"
              alt="Dog API"
              placeholder={<Text align="center">There's supposed to be a cute dog here</Text>}
            />
          )}
        </div>
      </Collapse>
    </Paper>
  );
};
