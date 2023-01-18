import { Title } from "@mantine/core";
import { Github, Letterboxd } from "components/Interests";
import { TopTracks } from "./Spotify";

export const Interests = () => {
  return (
    <>
      <Title order={1}>My Interests</Title>

      <Letterboxd />

      <Github />

      <TopTracks />
    </>
  );
};
