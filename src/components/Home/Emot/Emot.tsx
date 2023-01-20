import { useState } from "react";
import { Badge, Group, Paper, Text, Title } from "@mantine/core";
import { CardModal } from "components/Home";

const badges = ["Python", "PYQT5", "Spacy", "Sci-kit Learn", "Pandas", "BeautifulSoup", "SQLite"];

const description = `eMot is a customisable client based emotion classifier. The system uses data
extraction, natural language processing, emotion classification, and machine learning
to judge the sentiment of textual material being read online by a user.`;

const moreInfo = `This was a difficult project that I learned so much from. My fundamental skills of
collaboration using Git/ Gitlab was earned here.`;

export const Emot = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <CardModal
        title="eMot"
        badges={badges}
        imgSrc="icon.png"
        description={description}
        moreInfo={moreInfo}
        name="eMot"
        link="https://github.com/michaelssavage/eMot"
        opened={opened}
        setOpened={setOpened}
      />

      <Paper shadow="sm" p="sm" withBorder className="card" onClick={() => setOpened(true)}>
        <Group position="apart">
          <Title order={3}>eMot</Title>
          <Badge color="pink" variant="light">
            PYQT5
          </Badge>
        </Group>
        <Text>
          My 4th Year project was a customisable client based emotion classifier built using PYQT5.
        </Text>
        <Text style={{ marginTop: "0.4rem" }}>
          The system uses data extraction, natural language processing, emotion classification, and
          machine learning to judge the sentiment of textual material being read online by a user.
        </Text>
      </Paper>
    </>
  );
};
