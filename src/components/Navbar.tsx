import { Link } from "@tanstack/react-router";
import { Toggle } from "./Toggle";

export const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        {/* <Link
          to="/blog"
          activeProps={{
            className: "router-link-active",
          }}
        >
          Blog
        </Link>
        <Link
          to="/projects"
          activeProps={{
            className: "router-link-active",
          }}
        >
          Projects
        </Link>
        <Link to="/bites"> Bites </Link> */}
      </nav>
      <Toggle />
    </header>
  );
};
