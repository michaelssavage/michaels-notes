import { memo, useMemo } from "react";
import { Header, StyledLink } from "./Navbar.styled";

interface Props {
	to: string;
	text: string;
}

const NavLink = memo(({ to, text }: Props) => {
	const activeProps = useMemo(() => ({ className: "active" }), []);

	return (
		<StyledLink to={to} activeProps={activeProps}>
			{text}
		</StyledLink>
	);
});

export const Navbar = () => {
	return (
		<Header>
			<nav>
				<NavLink to="/" text="Home" />
				<NavLink to="/blog" text="Blog" />
				<NavLink to="/projects" text="Projects" />
			</nav>
		</Header>
	);
};
