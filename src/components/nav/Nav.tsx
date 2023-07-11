import Link from "next/link";
import { About, Home, Interests, Projects } from "components/blobs";
import styles from "./Nav.module.scss";

export const Nav = () => {
  return (
    <div>
      <div className={styles.aboutBlob}>
        <Link href="/about">
          <About />
        </Link>
      </div>

      <div className={styles.interestsBlob}>
        <Link href="/interests">
          <Interests />
        </Link>
      </div>

      <div className={styles.homeBlob}>
        <Link href="/">
          <Home />
        </Link>
      </div>

      <div className={styles.projectsBlob}>
        <Link href="/projects">
          <Projects />
        </Link>
      </div>
    </div>
  );
};
