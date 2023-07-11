import Link from "next/link";
import PageTitle from "components/PageTitle";
import { achievements, AchievementsProp } from "utils/achievements";
import { Contacts } from "components/contacts";
import styles from "styles/page.module.scss";

export default function About() {
  return (
    <section className={styles.main}>
      <PageTitle title="About Me" />
      <Link href="/">
        <h1>Michael Savage</h1>
      </Link>
      <p>
        Bsc. Computer Applications from Dublin City University (2017 - 2021).
      </p>

      <Contacts />

      <h2>Achievements</h2>
      {achievements.map((achievement: AchievementsProp) => (
        <div key={achievement.year}>
          <h3>{achievement.year}</h3>
          <ul>
            {achievement.group.map((sentence) => (
              <li key={sentence.id}>{sentence.val}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
