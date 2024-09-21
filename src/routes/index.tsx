import { Bite } from "@/components/Bite";
import { HomeLine } from "@/components/HomeLine";
import Icon from "@/components/Icon";
import {
  ArrowDown,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  SpotifyIcon,
} from "@/components/icons";
import styles from "@/styles/home.module.scss";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <main className={styles.container}>
        <h1>
          Hey, <span>I am Michael!</span>
        </h1>
        <div className={styles.icons}>
          <Icon
            link="https://github.com/michaelssavage"
            icon={<GithubIcon />}
            external
          />
          <Icon
            link="https://www.linkedin.com/in/michaelssavage"
            icon={<LinkedInIcon />}
            external
          />
          <Icon
            link="mailto:michaelsavage940@gmail.com"
            icon={<MailIcon />}
            external
          />
          <Icon
            link="https://open.spotify.com/user/1156402021"
            icon={<SpotifyIcon />}
            external
          />
        </div>
        <HomeLine />

        <ArrowDown className={styles.arrowDown} />
      </main>

      <Bite />
    </>
  );
}
