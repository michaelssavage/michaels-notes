import { Bite } from "@/components/Bite";
import { HomeLine } from "@/components/HomeLine";
import { Icon } from "@/components/atoms";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  SpotifyIcon,
} from "@/components/icons";
import { Arrow, Container, Icons } from "@/styles/home.styled";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Container>
        <h1>
          Hey, <span>I am Michael!</span>
        </h1>
        <Icons>
          <Icon
            link="https://github.com/michaelssavage"
            icon={<GithubIcon />}
            isExternal
          />
          <Icon
            link="https://www.linkedin.com/in/michaelssavage"
            icon={<LinkedInIcon />}
            isExternal
          />
          <Icon
            link="mailto:michaelsavage940@gmail.com"
            icon={<MailIcon />}
            isExternal
          />
          <Icon
            link="https://open.spotify.com/user/1156402021"
            icon={<SpotifyIcon />}
            isExternal
          />
        </Icons>
        <HomeLine />
        <Arrow />
      </Container>

      <Bite />
    </>
  );
}
