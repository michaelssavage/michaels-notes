import imageUrl from "@/assets/images/cover.jpg";
import { Anchor } from "@/components/Anchor";
import { Picture } from "@/components/Picture";
import { CurrentPlay } from "@/components/spotify/CurrentPlay";
import { TopTracks } from "@/components/spotify/TopTracks";
import {
  Container,
  Horizon,
  Paragraphs,
  Spotify,
  imageWrapperStyle,
} from "@/styles/routes/about.styled";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <>
      <Container>
        <Picture src={imageUrl} alt="Picture of Me" style={imageWrapperStyle} />
        <Paragraphs>
          <p>
            From Ireland and currently based in{" "}
            <span className="underline">Barcelona, Spain.</span> I'm a developer
            that enjoys React.js, Typescript, Python, and Spring Boot. My world
            revolves around electronic music, movies, rugby, and travelling.
          </p>
          <p>
            I studied Computer Applications in DCU and started working with
            Jaguar Land Rover, Shannon in 2021 where I learned to work with REST
            APIs using Spring Boot and React.js early on. I'm currently working
            with a startup in the heart of Barcelona, TalentBait, as a frontend
            developer using React.js.
          </p>
          <p>
            I'm passionate about films, and I love sharing and keeping track of
            them on Letterboxd (the best social media platform).
          </p>
          <p>
            I've played sports all my life including Gaelic Football for
            Clontibret O'Neills GFC and rugby for teams like Ulster Club u18s,
            Monaghan RFC, Ennis RFC, and Corinthians RFC. More recently I've
            joined a local running club and I'm preparing for the Barcelona half
            marathon!
          </p>
          <p>
            I co-created{" "}
            <Anchor
              variant="link"
              text="Plant Bass'd"
              link="/blog/what-is-plant-bassd"
            />
            , an electronic music blog and underground club night that set foot
            in Ireland and Scotland. Music is definitely a large part of my
            identity and I'm trying my hand at producing music on Ableton.
          </p>
        </Paragraphs>
      </Container>
      <Horizon />

      <Spotify>
        <CurrentPlay />
        <TopTracks />
      </Spotify>
    </>
  );
}
