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
import { createFileRoute } from "@tanstack/react-router";

const title = "About Me | Michael Savage";
const description = "About my background, experience, and interests";
const url = "https://michaelsavage.com/about";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    title,
    link: [{ rel: "canonical", href: url }],
    meta: [
      { property: "og:title", content: title },
      { property: "og:url", content: url },
      { name: "description", content: description },
      { property: "og:description", content: description },
    ],
  }),
});

function About() {
  return (
    <Content>
      <SectionInView delay={0}>
        <Paragraph>
          <Group align="center" gap="2rem" css={breakpoint}>
            <Picture
              src="/portrait.jpg"
              alt="Picture of Me"
              style={selfieStyle}
            />
            <p>
              Studied Computer Applications in DCU and started working with{" "}
              <Anchor
                link="https://careers.jaguarlandrover.com/where-we-are/ireland"
                text="JLR"
                variant="link"
              />
              in 2021. I&apos;m currently working as a Product Developer for a
              startup in the heart of Barcelona using tools like React.js,
              JavaScript, TypeScript, Django, Figma, and more!
            </p>
          </Group>
        </Paragraph>
      </SectionInView>

      <SectionInView delay={100}>
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
              />
              , an electronic music blog and underground club night that that
              took hold in Ireland and Scotland. I learned to DJ, create events,
              design posters, and I&apos;m always trying my hand at producing
              music on Ableton.
            </p>
          </Group>
        </Paragraph>
      </SectionInView>

      <SectionInView delay={200}>
        <Paragraph>
          <Letterboxd />
        </Paragraph>
      </SectionInView>

      <SectionInView delay={300}>
        <Paragraph>
          <Group align="center" gap="2rem">
            <p>
              I&apos;ve played sports like Gaelic Football and rugby growing up
              in Ireland. I represented Ulster Club u18s rugby, and I&apos;ve
              played for Monaghan RFC, Ennis RFC, and Corinthians RFC. I
              completed the 2025 Barcelona Half Marathon in 1 hour and 44
              minutes.
            </p>
          </Group>
        </Paragraph>
      </SectionInView>
    </Content>
  );
}
