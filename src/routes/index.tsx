import { Icon } from "@/components/atoms";
import {
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	SpotifyIcon,
} from "@/components/icons";
import { Bite } from "@/components/molecules/Bite";
import { HomeLine } from "@/components/molecules/HomeLine";
import { Arrow, Content, Icons, Panel } from "@/styles/routes/home.styled";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const biteRef = useRef<HTMLHeadingElement>(null);

	const scrollToBites = () => {
		biteRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<Content>
			<Panel>
				<h1>
					Hey, <span>I am Michael!</span>
				</h1>
				<Icons>
					<Icon
						link="https://github.com/michaelssavage"
						icon={<GithubIcon />}
						isExternal
					/>
					<Icon
						link="https://www.linkedin.com/in/michaelssavage"
						icon={<LinkedInIcon />}
						isExternal
					/>
					<Icon
						link="mailto:michaelsavage940@gmail.com"
						icon={<MailIcon />}
						isExternal
					/>
					<Icon
						link="https://open.spotify.com/user/1156402021"
						icon={<SpotifyIcon />}
						isExternal
					/>
				</Icons>
				<HomeLine />
				<Arrow onClick={scrollToBites} />
			</Panel>

			<Bite biteRef={biteRef} />
		</Content>
	);
}
