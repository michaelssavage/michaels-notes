import { Icon } from "@/components/atoms/Icon";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  ResumeIcon,
  SpotifyIcon,
} from "@/components/icons";
import { useLocation } from "@tanstack/react-router";
import { memo } from "react";
import { Header, Icons, StyledLink } from "./Navbar.styled";

interface Props {
  to: string;
  text: string;
  activeRoutes?: string[];
}

const NavLink = memo(({ to, text, activeRoutes }: Props) => {
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
});

const Navbar = () => {
  const captureCvClick = async () => {
    const posthog = (await import("posthog-js")).default;

    posthog.capture("cv_download_clicked", {
      source: "resume_button",
    });
  };

  return (
    <Header>
      <nav>
        <NavLink
          to="/"
          text="Writing"
          activeRoutes={["/", "/blog", "/review"]}
        />
        <NavLink to="/projects" text="Projects" />
        <NavLink to="/about" text="About" />
        <NavLink to="/miscellaneous" text="Misc" />
      </nav>
      <Icons>
        <Icon
          label="GitHub Profile"
          link="https://github.com/michaelssavage"
          icon={<GithubIcon />}
          isExternal
        />
        <Icon
          label="LinkedIn Profile"
          link="https://www.linkedin.com/in/michaelssavage"
          icon={<LinkedInIcon />}
          isExternal
        />
        <Icon
          label="My Email"
          link="mailto:michaelsavage940@gmail.com"
          icon={<MailIcon />}
          isExternal
        />
        <Icon
          label="Spotify Profile"
          link="https://open.spotify.com/user/1156402021"
          icon={<SpotifyIcon />}
          isExternal
        />
        <Icon
          label="View CV"
          link="https://www.canva.com/design/DAF5SupMjfo/kbopYKhI2C20XYOTIRJTaQ/view"
          icon={<ResumeIcon onClick={captureCvClick} />}
          isExternal
        />
      </Icons>
    </Header>
  );
};

export default Navbar;

NavLink.displayName = "NavLink";
