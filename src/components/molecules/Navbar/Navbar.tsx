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
  // const headerRef = useRef<HTMLElement | null>(null);
  // const logoSize = useSpringValue(150, {
  //   config: { tension: 220, friction: 26 },
  // });

  // const isCompact = useMatchMedia("(max-width: 768px)");

  // useEffect(() => {
  //   if (!headerRef.current) return;
  //   const element = headerRef.current;

  //   const updateHeaderHeight = () => {
  //     document.documentElement.style.setProperty(
  //       "--header-height",
  //       `${element.offsetHeight}px`
  //     );
  //   };

  //   updateHeaderHeight();
  //   if (typeof ResizeObserver === "function") {
  //     const observer = new ResizeObserver(updateHeaderHeight);
  //     observer.observe(element);
  //     return () => observer.disconnect();
  //   }

  //   window.addEventListener("resize", updateHeaderHeight);
  //   return () => window.removeEventListener("resize", updateHeaderHeight);
  // }, []);

  // useEffect(() => {
  //   let frame: number | null = null;

  //   const updateSize = () => {
  //     const nextSize = isCompact
  //       ? minSize
  //       : maxSize -
  //         Math.min(window.scrollY / distance, 1) * (maxSize - minSize);
  //     logoSize.set(nextSize);
  //     frame = null;
  //   };

  //   updateSize();
  //   const onScroll = () => {
  //     if (frame === null) {
  //       frame = window.requestAnimationFrame(updateSize);
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   window.addEventListener("resize", updateSize);

  //   return () => {
  //     if (frame !== null) {
  //       window.cancelAnimationFrame(frame);
  //     }
  //     window.removeEventListener("scroll", onScroll);
  //     window.removeEventListener("resize", updateSize);
  //   };
  // }, [isCompact, logoSize]);

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
