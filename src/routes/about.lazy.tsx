import { css, useTheme } from "@emotion/react";
import { createLazyFileRoute } from "@tanstack/react-router";
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
	const { colors } = useTheme();

	return (
		<Content>
			<SectionInView delay={0} main={colors.moon} bg={colors.section1}>
				<Paragraph>
					<Group align="center" gap="2rem" css={breakpoint}>
						<Picture src={selfieImg} alt="Picture of Me" style={selfieStyle} />
						<p>
							Studied Computer Applications in DCU and started working with{" "}
							<Anchor
								link="https://careers.jaguarlandrover.com/where-we-are/ireland"
								text="JLR"
								variant="link"
							/>
							, Shannon from 2021 to 2024. I'm currently working as a Frontend
							Developer in the heart of Barcelona using tools like React.js,
							JavaScript, TypeScript, TanStack, Figma, and more!
						</p>
					</Group>
				</Paragraph>
			</SectionInView>

			<SectionInView delay={100} main={colors.section2}>
				<Paragraph>
					<Group align="center" gap="2rem" css={breakpoint}>
						<Picture
							src="/blog/plantbassd.png"
							alt="Plant bass'd logo"
							style={plantbassdStyle}
						/>
						<p>
							I co-created{" "}
							<Anchor
								variant="link"
								text="Plant Bass'd"
								link="/blog/what-is-plant-bassd"
								style={css`color: ${colors.link};`}
							/>
							, an electronic music blog and underground club night that that
							took hold in Ireland and Scotland. I learned to DJ, create events,
							design posters, and I'm always trying my hand at producing music
							on Ableton.
						</p>
					</Group>
				</Paragraph>
			</SectionInView>

			<SectionInView delay={200} main={colors.section3} bg={colors.section3b}>
				<Paragraph>
					<Letterboxd />
				</Paragraph>
			</SectionInView>

			<SectionInView delay={300} main={colors.toggle} bg={colors.card}>
				<Paragraph>
					<Group align="center" gap="2rem">
						<p>
							I've played sports like Gaelic Football and rugby all my life! I
							represented Ulster Club u18s rugby, and I've played for Monaghan
							RFC, Ennis RFC, and Corinthians RFC. I've taken up running and
							completed the 2025 Barcelona Half Marathon in 1 hour and 44
							minutes.
						</p>
					</Group>
				</Paragraph>
			</SectionInView>
		</Content>
	);
}
