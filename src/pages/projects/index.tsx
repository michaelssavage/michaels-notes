import Image from "next/image";
import Link from "next/link";
import { Layout } from "components/Layout";
import styles from "styles/page.module.scss";
import { Contacts } from "components/Contacts";

export default function Projects() {
  return (
    <Layout title="Projects">
      <section className={styles.main}>
        <h1>Projects</h1>
        <p className={styles.opener}>Development projects during college and my career.</p>
        <Contacts />

        <div className={styles.group}>
          <Image
            src="/plant.png"
            alt="plant bass'd logo"
            width={150}
            height={150}
            className={styles.img}
          />
          <div>
            <h2>Plant Bass'd</h2>
            <p className={styles.aboutText}>
              A lockdown project that started as a way to share music interests with friends but
              evolved into an electronic music blog sharing new music, events, and gigs happening in
              Dublin, Glasgow, and Edinburgh.
            </p>

            <p className={styles.readMore}>
              <Link href="/projects/plant-bassd">Read More</Link>
            </p>
          </div>
        </div>

        <div className={styles.group}>
          <Image
            src="/savage.png"
            alt="that's savage logo"
            width={180}
            height={200}
            className={styles.thatsSavageImg}
          />
          <div>
            <h2>That's Savage</h2>
            <p className={styles.aboutText}>
              A static website for a family graphics & print company showcasing different clothes
              printing options as well some graphic design logos.
            </p>

            <p className={styles.readMore}>
              <a target="_blank" rel="noopener noreferrer" href="https://thatssavage.ie/">
                Read More
              </a>
            </p>
          </div>
        </div>

        <div className={styles.group}>
          <Image src="/icon.png" alt="eMot logo" width={150} height={150} />
          <div>
            <h2>eMot</h2>
            <p className={styles.aboutText}>
              My final year project on a customisable client based emotion classifier. The system
              uses data extraction, natural language processing, emotion classification, and machine
              learning to judge the sentiment of textual material being read online by a user.
            </p>

            <p className={styles.readMore}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/michaelssavage/eMot/"
              >
                Read More
              </a>
            </p>
          </div>
        </div>

        <div className={styles.group}>
          <Image
            src="/lock.jpg"
            alt="metal lock"
            width={150}
            height={150}
            style={{
              borderRadius: "0.5rem",
            }}
          />
          <div>
            <h2>B2B Order System</h2>
            <p className={styles.aboutText}>
              4th Year Project that focused on a concurrent client/server model using a React
              frontend and Python Flask Backend.
            </p>

            <p className={styles.readMore}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/michaelssavage/b2b-react-flask"
              >
                Read More
              </a>
            </p>
          </div>
        </div>

        <div className={styles.group}>
          <Image
            src="/rekordbox.jpg"
            alt="rekordbox logo"
            width={150}
            height={150}
            style={{
              borderRadius: "0.5rem",
            }}
          />
          <div>
            <h2>Rekordbox Text Prettifier</h2>
            <p className={styles.aboutText}>
              Created a really an executable file using Pyinstaller to help export setlists from the
              DJ Software Rekordbox for better readability.
            </p>

            <p className={styles.readMore}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/michaelssavage/Rekordbox-Mix-Setlist"
              >
                Read More
              </a>
            </p>
          </div>
        </div>

        <div className={styles.group}>
          <Image
            src="/letterboxd.png"
            alt="letterboxd logo"
            width={150}
            height={150}
            style={{
              borderRadius: "0.5rem",
            }}
          />
          <div>
            <h2>Letterboxd Common Movies</h2>
            <p className={styles.aboutText}>
              A forked project of CLI that returns common movies from Letterboxd users watchlists.
              Updated it to be Object Oriented and also give the user a random movie from the users
              watchlists.
            </p>

            <p className={styles.readMore}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/michaelssavage/common-movies"
              >
                Read More
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
