import { Header, StyledLink } from "./Navbar.styled";

interface Props {
  to: string;
  text: string;
}

const NavLink = ({ to, text }: Props) => {
  return (
    <StyledLink to={to} activeProps={{ className: "active" }}>
      {text}
    </StyledLink>
  );
};

export const Navbar = () => {
  return (
    <Header>
      <nav>
        <NavLink to="/" text="Home" />
        <NavLink to="/projects" text="Projects" />
        <NavLink to="/blog" text="Blog" />
        <NavLink to="/about" text="About" />
      </nav>
    </Header>
  );
};
