import { Collapse, Grid, Paper, Text, Title } from "@mantine/core";
import { ReactNode, useState } from "react";
import { Github, Letterboxd } from "components/Interests";
import { Loading } from "components/Loading/Loading";
import { TopTracks } from "./Spotify";
import styles from "./interests.module.scss";

type ShowProps = "letterboxd" | "github" | "spotify" | "";

interface CardItemProps {
  (
    title: string,
    text: string,
    interest: ShowProps,
    show: string,
    openCard: (v: ShowProps) => void
  ): ReactNode;
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

const showItems = (show: string) => {
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

export const Interests = () => {
  const [show, setShow] = useState<ShowProps>("");
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);

  const openCard = (card: ShowProps) => {
    setShow(card);
    setLoading(true);

    // adding a delay for the Github API to catchup.
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // open the card if it isn't already open, otherwise close it.
    if (card !== show) setOpened(true);
    else setOpened(!opened);
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

      <Collapse in={opened}>{loading ? <Loading /> : showItems(show)}</Collapse>
    </>
  );
};
