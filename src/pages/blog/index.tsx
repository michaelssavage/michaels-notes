import { Contacts } from "components/Contacts";
import { Layout } from "components/Layout";
import styles from "styles/page.module.scss";

export default function Blog() {
  return (
    <Layout title="Michael Savage Blog">
      <section className={styles.main}>
        <h1>Blog</h1>
        <p className={styles.opener}>A collection of random thoughts, ideas, and stories.</p>
        <Contacts />

        <div className={styles.blogPost}>
          <a
            href="https://www.plantbassd.com/news/body-and-soul-23-6-23"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>On site at Body And Soul 2023</h3>
            <span className={styles.reviewTag}>Review</span>
            <p className={styles.blogDate}>Posted on June 23, 2023</p>
            <p className={styles.blogText}>
              I danced, I laughed, I ate, I drank, and I had some good times. My feet danced to
              Shanti Celeste, HAAi, Joy Anonymous, and Gerd Janson. My emotions swirled from
              listening to Ye Vagabonds, Anna Mieke, The Blaze, and Kurt Vile & The Violators. My
              belly tensed with laughter from I'm Grand Mam, David O'Doherty, and Michael Fry &
              Killian Sundermann.
            </p>
          </a>
        </div>

        <div className={styles.blogPost}>
          <a
            href="https://www.plantbassd.com/top-ten-releases/michael-22-12-22"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Top 10 Releases Of The Year 2022</h3>
            <span className={styles.blogTag}>Music</span>
            <p className={styles.blogDate}>Posted on December 22, 2022</p>
            <p className={styles.blogText}>
              I shared my 2022 roundup of dance music from leftfield bass, percussion, to electro.
            </p>
          </a>
        </div>

        <div className={styles.blogPost}>
          <a
            href="https://www.plantbassd.com/fresh-juice/sloucho-4-11-22"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>FRESH JUICE: Hold It Down by Sloucho</h3>
            <span className={styles.blogTag}>Music</span>
            <p className={styles.blogDate}>Posted on November 4, 2022</p>
            <p className={styles.blogText}>
              Cabal co-founder & Director Cóilín Phelan debuts his first release under new moniker
              Sloucho with 'Hold It Down'.
            </p>
          </a>
        </div>

        <div className={styles.blogPost}>
          <a
            href="https://www.plantbassd.com/news/another-love-story-26-8-22"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Another Love Story Festival 2022</h3>
            <span className={styles.reviewTag}>Review</span>
            <p className={styles.blogDate}>Posted on August 26, 2022</p>
            <p className={styles.blogText}>
              Another Love Story aims to start the journey slowly, build you up and gently take you
              back down to where you started your weekend. Leaving the festival feeling optimistic
              and fulfilled on Sunday evening is a refreshing change to other festivals where
              attendees collectively trudge away from the grounds on Monday morning.
            </p>
          </a>
        </div>

        <div className={styles.blogPost}>
          <a
            href="https://www.plantbassd.com/fresh-juice/long-island-sound-31-1-22"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>FRESH JUICE: Long Island Sound - First Contact</h3>
            <span className={styles.blogTag}>Music</span>
            <p className={styles.blogDate}>Posted on January 31, 2022</p>
            <p className={styles.blogText}>
              Long Island Sound are duo Rob Roche and Tim Nolan, who've just released their EP First
              Contact on Irish artist Hammer's label, Remmah.
            </p>
          </a>
        </div>
      </section>
    </Layout>
  );
}
