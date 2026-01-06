import { Picture } from "@/components/molecules/Picture";
import { animated, useScroll, useSpring } from "@react-spring/web";
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

  const { size } = useSpring({
    size: scrollY.to([0, 200], [160, 48], "clamp"),
    config: {
      tension: 120,
      friction: 26,
      precision: 0.1,
    },
  });

  const logoWidth = size.to((size) => `${size}px`);
  const logoHeight = size.to((size) => `${size}px`);

  return (
    <Header>
      <Link to="/">
        <animated.div
          id="navbar-logo-link"
          style={{ width: logoWidth, height: logoHeight }}
        >
          <Picture src="/logo.png" alt="Logo" loading="eager" />
        </animated.div>
      </Link>
      <div id="navbar-links-container">
        <NavLink
          to="/"
          text="Writing"
          activeRoutes={["/", "/blog", "/review"]}
        />
        <NavLink to="/projects" text="Projects" />
        <NavLink to="/about" text="About" />
        <NavLink
          to="/miscellaneous"
          text="Miscellaneous"
          activeRoutes={[
            "/miscellaneous",
            "/guide",
            "/doodles",
            "/mixes",
            "/pretty-text",
          ]}
        />
      </div>
    </Header>
  );
}
