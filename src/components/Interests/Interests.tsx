import { Collapse, Grid, Paper, Text, Title } from "@mantine/core";
import { useState } from "react";
import { Github, Letterboxd } from "components/Interests";
import { TopTracks } from "./Spotify";
import styles from "./interests.module.scss";

type ShowProps = "letterboxd" | "github" | "spotify";

const showItems = (show) => {
  switch (show) {
    case "letterboxd":
      return <Letterboxd />;
    case "github":
      return <Github />;
    case "spotify":
      return <TopTracks />;
    default:
      return null;
  }
};

interface CardItemProps {
  (title: string, text: string, interest: string, show: string, openCard: (v: string) => void);
}

const CardItem: CardItemProps = (title, text, interest, show, openCard) => {
  return (
    <Grid.Col span={4}>
      <Paper
        shadow="md"
        p="sm"
        withBorder
        className={show === interest ? styles.activeCard : styles.cardClick}
        onClick={() => openCard(interest)}
      >
        <Title order={3}>{title}</Title>
        <Text>{text}</Text>
      </Paper>
    </Grid.Col>
  );
};

export const Interests = () => {
  const [show, setShow] = useState<ShowProps>("");
  const [opened, setOpened] = useState(false);

  const openCard = (card: string) => {
    if (card !== show) {
      setShow(card);
      setOpened(true);
    } else {
      setOpened(!opened);
    }
  };

  return (
    <>
      <Title order={1}>My Interests</Title>

      <Grid mt="xs">
        {CardItem("Movies & TV", "My Favourite Movies", "letterboxd", show, openCard)}

        {CardItem(
          "Graphic Design",
          "Artwork created using Adobe Illustrator",
          "github",
          show,
          openCard
        )}

        {CardItem("Music", "My Current Favourite Tracks on Spotify", "spotify", show, openCard)}
      </Grid>

      <Collapse in={opened}>{showItems(show)}</Collapse>
    </>
  );
};
