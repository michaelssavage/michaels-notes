import { sortById } from "@/assets/utils";
import { Anchor } from "@/components/Anchor";
import { Picture } from "@/components/Picture";
import { CurrentPlay } from "@/components/spotify/CurrentPlay";
import { TopTracks } from "@/components/spotify/TopTracks";
import { Container, MotionCol, Row } from "@/styles/abstracts/layout.styled";
import {
  Header,
  SpotifyContent,
  View,
  Wrap,
} from "@/styles/routes/projects.styled";
import type { IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});

const { projects }: IPosts = import.meta.env.POSTS;

function Projects() {
  return (
    <>
      <Container>
        <Row>
          {projects.sort(sortById).map((project) => (
            <MotionCol
              size="md"
              key={project.id}
              layoutId={`project-image-${project.id}`}
            >
              <Wrap to={project.slug}>
                <Picture
                  src={
                    new URL(`../../assets/${project.image}`, import.meta.url)
                      .href
                  }
                  alt={project.title}
                  loading="eager"
                />
                <View>
                  <span>{project.title}</span>
                  <span>{project.description}</span>
                </View>
              </Wrap>
            </MotionCol>
          ))}
        </Row>
        <SpotifyContent>
          <Header>
            <h2>Consuming Spotify Data</h2>
            <p>
              I spent some time learning how to use the Spotify API and you can
              read my{" "}
              <Anchor
                link="blog/spotify-developer-api"
                text="words about it here"
                variant="link"
              />
              . Below you can see the top 10 tracks I've listened to recently
              and my last listened to song. If I'm online it will display what
              I'm currently listening to.
            </p>
          </Header>
          <TopTracks />
          <CurrentPlay />
        </SpotifyContent>
      </Container>
    </>
  );
}
