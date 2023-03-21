import { useState } from "react";
import { Badge, Group, Paper, Text, Title } from "@mantine/core";
import { CardModal } from "components/Home";

const badges = ["Python", "Flask", "React", "Axios", "Concurrency", "locks"];

const description = `4th Year Project that focused on a concurrent client/server model
using a React frontend and Python Flask Backend. Users could sign up, place orders
and check stock availability on an order system. Learned about REST being stateless,
using asynchronous requests, and Reader/ Writer locks.`;

export const OrderSystem = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <CardModal
        title="B2B ordering system"
        badges={badges}
        imgSrc="lock.jpg"
        description={description}
        name="B2B React Flask"
        link="https://github.com/michaelssavage/b2b-react-flask"
        opened={opened}
        setOpened={setOpened}
      />
      <Paper
        shadow="sm"
        p="sm"
        withBorder
        className={opened ? "openCard" : "card"}
        onClick={() => setOpened(!opened)}
      >
        <Group position="apart">
          <Title order={3}>B2B Order System</Title>
          <Badge color="pink" variant="light">
            React/ Flask
          </Badge>
        </Group>
        <Text>B2B ordering system with ReactJS and Flask</Text>
      </Paper>
    </>
  );
};
