import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.navItems}>
          <Link to="/#about-me">Home</Link>
          <Link to="/#interests">Interests</Link>
          <Link to="/#projects">Projects</Link>
          <Link to="/cv">CV</Link>
        </div>
      </nav>
    </div>
  );
};
