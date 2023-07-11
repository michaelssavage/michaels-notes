import Link from "next/link";
import { MouseEvent, useState } from "react";
import { About, Home, Interests, Projects } from "components/blobs";
import { Close, Menu } from "components/icons";
import styles from "./Nav.module.scss";

export const Nav = () => {
  const [showItems, setShowItems] = useState(false);

  const showMenuItems = (event: MouseEvent) => {
    event.preventDefault();
    setShowItems(!showItems);
  };
  return (
    <div className={styles.navContainer}>
      <button className={styles.menuButton} onClick={showMenuItems}>
        {showItems ? <Close size={40} /> : <Menu size={40} />}
      </button>

      <div className={`${styles.nav} ${showItems ? styles.show : ""}`}>
        <div className={styles.aboutTriangle}>
          <Link href="/about">
            <About />
          </Link>
        </div>

        <div className={styles.interestsTriangle}>
          <Link href="/interests">
            <Interests />
          </Link>
        </div>

        <div className={styles.homeTriangle}>
          <Link href="/">
            <Home />
          </Link>
        </div>

        <div className={styles.projectsTriangle}>
          <Link href="/projects">
            <Projects />
          </Link>
        </div>
      </div>
    </div>
  );
};
