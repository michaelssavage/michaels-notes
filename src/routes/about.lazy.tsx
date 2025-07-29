import { useTheme } from "@emotion/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import plantbassdImg from "@/assets/images/blog/plantbassd.png";
import selfieImg from "@/assets/images/me.jpg";
import { Group } from "@/components/atoms/Group";
import { SectionInView } from "@/components/atoms/SectionInView";
import { Anchor } from "@/components/molecules/Anchor";
import { Letterboxd } from "@/components/molecules/Letterboxd";
import { Picture } from "@/components/molecules/Picture";
import {
	breakpoint,
	Content,
	Paragraph,
	plantbassdStyle,
	selfieStyle,
} from "@/styles/routes/home.styled";

export const Route = createLazyFileRoute("/about")({
	component: About,
});

function About() {
	const theme = useTheme();

	return (
		<Content>
			<SectionInView
				delay={0}
				main={theme.colors.moon}
				bg={theme.colors.section1}
			>
				<Paragraph>
					<Group align="center" gap="2rem" css={breakpoint}>
						<Picture src={selfieImg} alt="Picture of Me" style={selfieStyle} />
						<p>
							Studied Computer Applications in DCU and started working with
							Jaguar Land Rover, Shannon from 2021 to 2024. I'm currently
							working with Talentbait in the heart of Barcelona as a frontend
							developer using Node.js and React.js.
						</p>
					</Group>
				</Paragraph>
			</SectionInView>

			<SectionInView delay={200} main={theme.colors.section2}>
				<Paragraph>
					<Group align="center" gap="2rem" css={breakpoint}>
						<Picture
							src={plantbassdImg}
							alt="Plant bass'd logo"
							style={plantbassdStyle}
						/>
						<p>
							I co-created{" "}
							<Anchor
								variant="link"
								text="Plant Bass'd"
								link="/blog/what-is-plant-bassd"
							/>
							, an electronic music blog and underground club night that that
							took hold in Ireland and Scotland. I learned to DJ, create events,
							design posters, and I'm always trying my hand at producing music
							on Ableton.
						</p>
					</Group>
				</Paragraph>
			</SectionInView>

			<SectionInView
				delay={400}
				main={theme.colors.section3}
				bg={theme.colors.section3b}
			>
				<Paragraph>
					<Letterboxd />
				</Paragraph>
			</SectionInView>

			<SectionInView
				delay={600}
				main={theme.colors.toggle}
				bg={theme.colors.card}
			>
				<Paragraph>
					<Group direction="column" align="center">
						<p>
							I've played sports like Gaelic Football and rugby all my life. I
							represented the Ulster Club u18s rugby team, and have played for
							Monaghan RFC, Ennis RFC, and Corinthians RFC. Recently I've taken
							up running and completed the Barcelona Half Marathon 1 hour and 44
							minutes.
						</p>
					</Group>
				</Paragraph>
			</SectionInView>
		</Content>
	);
}
