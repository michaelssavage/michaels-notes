import { Badge, Card, Group, Image, Text, Title } from "@mantine/core";
import useSWR from "swr";
import { getDogPic } from "api/dogs";

interface DogProps {
  url: string;
  width: string;
  height: string;
}

export const Dogs = () => {
  const { data } = useSWR<DogProps>("https://api.thedogapi.com/v1/images/search", getDogPic);

  return (
    <Card mt="xs" shadow="sm" p="sm" withBorder>
      <Group position="apart">
        <Title order={3}>Dog API</Title>
        <Badge color="pink" variant="light">
          REST
        </Badge>
      </Group>
      <Text>Here, have a free picture of a dog</Text>
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}>
        {data && (
          <Image
            src={data.url}
            width="100%"
            alt="Dog API"
            placeholder={<Text align="center">There's supposed to be a cute dog here</Text>}
          />
        )}
      </div>
    </Card>
  );
};
