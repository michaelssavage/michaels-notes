import { logoutFn } from "@/api/auth/logout.api";
import { MenuIcon } from "@/components/icons/Menu";
import { UserIcon } from "@/components/icons/User";
import { XIcon } from "@/components/icons/X";
import { Button } from "@/components/molecules/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/Overlays";
import {
  Link,
  useLoaderData,
  useLocation,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AdminContent,
  AdminMenu,
  AdminUserIcon,
  HamburgerButton,
  Header,
  MobileNavCount,
  MobileNavLinks,
  MobileNavOverlay,
  MobileStyledLink,
  NavCount,
  StyledLink,
} from "./Navbar.styled";

interface NavItem {
  to: string;
  text: string;
  activeRoutes?: string[];
  count?: number;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", text: "Writing", activeRoutes: ["/", "/blog", "/review"] },
  { to: "/projects", text: "Projects" },
  { to: "/about", text: "About", count: 4 },
  {
    to: "/extras",
    text: "Extras",
    activeRoutes: ["/extras", "/guide", "/doodles", "/mixes", "/pretty-text"],
    count: 6,
  },
];

const useIsActive = ({ to, activeRoutes }: NavItem) => {
  const location = useLocation();

  return activeRoutes
    ? activeRoutes.some(
        (route) =>
          location.pathname === route ||
          location.pathname.startsWith(route + "/"),
      )
    : location.pathname === to;
};

const NavLink = (item: NavItem) => {
  const isActive = useIsActive(item);

  return (
    <StyledLink to={item.to} className={isActive ? "active" : ""}>
      {item.text}
      {item.count !== undefined && <NavCount>{item.count}</NavCount>}
    </StyledLink>
  );
};

const MobileNavLink = (item: NavItem) => {
  const isActive = useIsActive(item);

  return (
    <MobileStyledLink to={item.to} className={isActive ? "active" : ""}>
      <span>{item.text}</span>

      {item.count !== undefined && (
        <MobileNavCount>{item.count}</MobileNavCount>
      )}
    </MobileStyledLink>
  );
};

export default function Navbar() {
  const router = useRouter();
  const location = useLocation();
  const { isAdmin } = useRouteContext({ from: "__root__" });
  const { writingCount, projectsCount } = useLoaderData({ from: "__root__" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = NAV_ITEMS.map((item) => {
    if (item.to === "/") return { ...item, count: writingCount };
    if (item.to === "/projects") return { ...item, count: projectsCount };
    return item;
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const logout = async () => {
    await logoutFn();
    void router.invalidate();
  };

  return (
    <>
      <Header>
        <Link id="navbar-logo-link" to="/">
          <img src="/logo.png" alt="Logo" loading="eager" />
        </Link>
        {navItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
        <HamburgerButton
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </HamburgerButton>
        {isAdmin ? (
          <AdminMenu>
            <Popover placement="bottom">
              <PopoverTrigger style={{ backgroundColor: "transparent" }}>
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
          </AdminMenu>
        ) : (
          <></>
        )}
      </Header>
      <MobileNavOverlay $open={isMenuOpen}>
        <MobileNavLinks>
          {navItems.map((item) => (
            <MobileNavLink key={item.to} {...item} />
          ))}
        </MobileNavLinks>
      </MobileNavOverlay>
    </>
  );
}
