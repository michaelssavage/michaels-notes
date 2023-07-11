import Link from "next/link";
import PageTitle from "components/PageTitle";
import { Contacts } from "components/contacts";
import { NowPlaying } from "components/SpotifyUtils";
import styles from "styles/page.module.scss";

export default function Home() {
  return (
    <section className={styles.main}>
      <PageTitle title="Michael Savage Portfolio" />
      <Link href="/">
        <h1>Michael Savage</h1>
      </Link>
      <p>
        Hey, I'm a Software Developer at Jaguar Land Rover, Ireland. I'm
        passionate about all things music, movies, sports, and travelling.
      </p>
      <p className={styles.spacer}>
        I love to learn new and exciting technologies and want to pursue Full
        Stack Development. Proficient in React, Typescript, Java, Spring Boot,
        and Python. Experience with CI/CD, APIs and UI/UX.
      </p>

      <Contacts />

      <h2>What Am I Listening To?</h2>
      <NowPlaying />
    </section>
  );
}
