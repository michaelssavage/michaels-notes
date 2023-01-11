import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.navItems}>
          <Link href="#about-me">Home</Link>
          <Link href="#interests">Interests</Link>
          <Link href="#projects">Projects</Link>
          <Link href="/">CV</Link>
        </div>
      </nav>
    </div>
  );
};
