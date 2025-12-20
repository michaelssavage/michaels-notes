import { Picture } from "@/components/molecules/Picture";
import { animated, useScroll } from "@react-spring/web";
import { Link, useLocation } from "@tanstack/react-router";
import { Header, StyledLink } from "./Navbar.styled";

interface Props {
  to: string;
  text: string;
  activeRoutes?: string[];
}

const NavLink = ({ to, text, activeRoutes }: Props) => {
  const location = useLocation();

  const isActive = activeRoutes
    ? activeRoutes.some(
        (route) =>
          location.pathname === route ||
          location.pathname.startsWith(route + "/")
      )
    : location.pathname === to;

  return (
    <StyledLink to={to} className={isActive ? "active" : ""}>
      {text}
    </StyledLink>
  );
};

export default function Navbar() {
  const { scrollY } = useScroll();

  const logoSize = scrollY.to([0, 200], [10, 2.5], "clamp");

  return (
    <Header>
      <div id="navbar-links-container">
        <Link to="/" id="navbar-logo-link">
          <animated.div
            style={{
              width: logoSize.to((size) => `${size}rem`),
              height: logoSize.to((size) => `${size}rem`),
            }}
          >
            <Picture src="/logo.png" alt="Logo" loading="eager" />
          </animated.div>
        </Link>
        <NavLink
          to="/"
          text="Writing"
          activeRoutes={["/", "/blog", "/review"]}
        />
        <NavLink to="/projects" text="Projects" />
        <NavLink to="/about" text="About" />
        <NavLink to="/miscellaneous" text="Miscellaneous" />
      </div>
    </Header>
  );
}
