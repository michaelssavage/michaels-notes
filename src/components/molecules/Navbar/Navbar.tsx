import { UserIcon } from "@/components/icons/User";
import { Button } from "@/components/molecules/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/Overlays";
import { Picture } from "@/components/molecules/Picture";
import { logoutFn } from "@/server/auth/logout.api";
import {
  Link,
  useLocation,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import {
  AdminContent,
  AdminUserIcon,
  Header,
  StyledLink,
} from "./Navbar.styled";

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
  const router = useRouter();
  const { isAdmin } = useRouteContext({ from: "__root__" });

  const logout = async () => {
    await logoutFn();
    void router.invalidate();
  };

  return (
    <Header>
      <Link to="/">
        <div id="navbar-logo-link">
          <Picture src="/logo.png" alt="Logo" loading="eager" />
        </div>
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
      {isAdmin ? (
        <Popover placement="bottom">
          <PopoverTrigger
            style={{ marginLeft: "auto", backgroundColor: "transparent" }}
          >
            <AdminUserIcon>
              <UserIcon size={28} />
            </AdminUserIcon>
          </PopoverTrigger>
          <PopoverContent
            style={{
              zIndex: 20,
            }}
          >
            <AdminContent>
              <Button text="Logout" variant="ghost" onClick={logout} />
            </AdminContent>
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )}
    </Header>
  );
}
