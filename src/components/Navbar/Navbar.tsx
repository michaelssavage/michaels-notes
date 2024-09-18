import { Toggle } from "../Toggle";
import { NavLink } from "./NavLink";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <NavLink to="/" text="Home" />
        <NavLink to="/projects" text="Projects" />
        <NavLink to="/blog" text="Blog" />
        <NavLink to="/about" text="About" />
      </nav>
      <Toggle />
    </header>
  );
};
