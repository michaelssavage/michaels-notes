import { Toggle } from "../Toggle";
import styles from "./Navbar.module.scss";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <NavLink to="/" text="Home" />
        <NavLink to="/about" text="About" />
        <NavLink to="/projects" text="Projects" />
        {/* <Link
          to="/blog"
          activeProps={{
            className: "router-link-active",
          }}
        >
          Blog
        </Link>
        
        <Link to="/bites"> Bites </Link> */}
      </nav>
      <Toggle />
    </header>
  );
};
