import { createFileRoute } from "@tanstack/react-router";
import Icon from "../components/Icon";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  SpotifyIcon,
} from "../components/icons";
import styles from "../styles/home.module.scss";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className={styles.container}>
      <h1>
        Hey, <span>I am Michael!</span>
      </h1>
      <p>
        I'm a Software Developer from Ireland that enjoys React.js, Typescript,
        Python, and Spring Boot. My world revolves around
        <span className="underline">
          electronic music, movies, rugby, and travelling
        </span>
        .
      </p>
      <div className={styles.icons}>
        <Icon
          external
          link="https://github.com/michaelssavage"
          icon={<GithubIcon />}
        />
        <Icon
          external
          link="https://www.linkedin.com/in/michaelssavage"
          icon={<LinkedInIcon />}
        />
        <Icon
          external
          link="mailto:michaelsavage940@gmail.com"
          icon={<MailIcon />}
        />
        <Icon
          external
          link="https://open.spotify.com/user/1156402021"
          icon={<SpotifyIcon />}
        />
      </div>
      <div className={styles.homeLine} />
    </main>
  );
}
