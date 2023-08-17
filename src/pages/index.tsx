import { Contacts } from "components/Contacts";
import { NowPlaying } from "components/Spotify";
import styles from "styles/page.module.scss";
import { Layout } from "components/Layout";
import { Timeline } from "components/Timeline";

export default function Home() {
  return (
    <Layout title="Michael Savage Portfolio">
      <section className={styles.main}>
        <h1>Michael Savage</h1>
        <p className={styles.opener}>
          Hey, I'm a Software Developer with Jaguar Land Rover, Ireland. I love to learn new and
          exciting technologies and want to pursue full stack development.
        </p>

        <Contacts />

        <div className={styles.sectionSpace}>
          <h2>About</h2>
          <p className={styles.aboutText}>
            I love to work with NextJS, ReactJS and Typescript for frontend development and Java/
            Spring Boot for backend work. I've experience with CI/CD, Python, APIs and UI/UX that I
            hope to develop over my career. Outside of work, I'm passionate about all things music,
            movies, sports, and travelling.
          </p>
        </div>

        <div className={styles.sectionSpace}>
          <h2>What Am I Listening To?</h2>
          <NowPlaying />
        </div>

        <div className={styles.sectionSpace}>
          <h2>Personal Achievements</h2>
          <Timeline />
        </div>
      </section>
    </Layout>
  );
}
