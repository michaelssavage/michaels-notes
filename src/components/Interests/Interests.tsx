import { Title } from "@mantine/core";
import { Github } from "components/Github";
import { Letterboxd } from "components/Letterboxd";
import { TopTracks } from "components/Spotify";

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
