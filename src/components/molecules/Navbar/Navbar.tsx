import { Icon } from "@/components/atoms";
import {
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	ResumeIcon,
	SpotifyIcon,
} from "@/components/icons";
import posthog from "posthog-js";
import { memo } from "react";
import { Header, Icons, Panel, StyledLink } from "./Navbar.styled";

interface Props {
	to: string;
	text: string;
}

const NavLink = memo(({ to, text }: Props) => {
	return (
		<StyledLink to={to} activeProps={{ className: "active" }}>
			{text}
		</StyledLink>
	);
});

export const Navbar = () => {
	const captureCvClick = () => {
		posthog.capture("cv_download_clicked", {
			source: "resume_button",
		});
	};

	return (
		<Header>
			<nav>
				<NavLink to="/" text="Blog" />
				<NavLink to="/projects" text="Projects" />
				<NavLink to="/about" text="About" />
			</nav>
			<Panel>
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
			</Panel>
		</Header>
	);
};
