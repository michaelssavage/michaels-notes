import { Icon } from "@/components/atoms";
import { PARAGRAPHS } from "@/components/atoms/Paragraph";
import {
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	ResumeIcon,
	SpotifyIcon,
} from "@/components/icons";
import { HomeLine } from "@/components/molecules/HomeLine";
import { Paragraph, Section } from "@/styles/routes/about.styled";
import { Content, Icons, Panel } from "@/styles/routes/home.styled";
import { createFileRoute } from "@tanstack/react-router";
import posthog from "posthog-js";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const captureCvClick = () => {
		posthog.capture("cv_download_clicked", {
			source: "resume_button",
		});
	};

	return (
		<Content>
			<Panel>
				<h1>
					Michael <span>Savage</span>
				</h1>
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
						label="Download My CV"
						link="https://www.canva.com/design/DAF5SupMjfo/kbopYKhI2C20XYOTIRJTaQ/view"
						icon={<ResumeIcon onClick={captureCvClick} />}
						isExternal
					/>
				</Icons>
				<HomeLine />
			</Panel>

			{PARAGRAPHS.map(({ id, value }) => (
				<Section key={id}>
					<Paragraph>{value}</Paragraph>
				</Section>
			))}
		</Content>
	);
}
