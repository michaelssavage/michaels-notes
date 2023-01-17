import { Text } from "@mantine/core";
import { Github } from "components/Github";
import { TopTracks } from "components/Spotify";

export const Interests = () => {
  return (
    <>
      <h1>My Interests</h1>

      <Github />

      <h2>Movies & TV</h2>
      <Text>My favourite movies pulled from Letterboxd</Text>

      <TopTracks />
    </>
  );
};
