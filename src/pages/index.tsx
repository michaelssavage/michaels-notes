import Link from "next/link";
import PageTitle from "components/PageTitle";
import { Contacts } from "components/contacts";
import { NowPlaying } from "components/spotify";
import styles from "styles/page.module.scss";

export default function Home() {
  return (
    <section className={styles.main}>
      <PageTitle title="Michael Savage Portfolio" />
      <Link href="/">
        <h1>Michael Savage</h1>
      </Link>
      <p>
        Hey, I'm a Software Developer with Jaguar Land Rover, Ireland. I love to
        learn new and exciting technologies and want to pursue full stack
        development. I'm proficient in React, Typescript, Java, Spring Boot, and
        Python and I've experience with CI/CD, APIs and UI/UX.
      </p>
      <p className={styles.spacer}>
        I'm passionate about all things music, movies, sports, and travelling.
      </p>

      <Contacts />

      <h2>What Am I Listening To?</h2>
      <NowPlaying />
    </section>
  );
}
