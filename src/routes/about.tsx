import { Group } from "@/components/atoms/Group";
import { SectionInView } from "@/components/atoms/SectionInView";
import { Anchor } from "@/components/molecules/Anchor";
import { Letterboxd } from "@/components/molecules/Letterboxd";
import { Picture } from "@/components/molecules/Picture";
import {
  breakpoint,
  Content,
  CustomSites,
  Opening,
  Paragraph,
  plantbassdStyle,
  reverseBreak,
  selfieStyle,
} from "@/styles/routes/home.styled";
import { createFileRoute } from "@tanstack/react-router";

const title = "About Me | Michael Savage";
const description = "About my background, experience, and interests";
const url = "https://michaelsavage.com/about";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    link: [{ rel: "canonical", href: url }],
    meta: [
      { title },
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
          <Group align="center" gap="0" css={breakpoint}>
            <Picture
              src="/media/portrait.png"
              alt="Picture of Me"
              style={selfieStyle}
            />
            <Opening>
              Started my career as a Software Developer in 2021 with JLR after
              studying Computer Applications in Dublin. I moved to Barcelona in
              2024, where I&apos;m currently working as a Product Developer for
              a Sports Travel startup.
            </Opening>
          </Group>
        </Paragraph>
      </SectionInView>

      <SectionInView delay={100}>
        <Paragraph>
          <Group align="center" gap="1rem" css={reverseBreak}>
            <p>
              From 2020 to 2023, I co-ran{" "}
              <Anchor
                variant="link"
                text="Plant Bass'd"
                link="/blog/what-is-plant-bassd"
              />
              , an electronic music blog and helped organise club nights in
              Galway, Dublin, Scotland, and Edinburgh. In these times, I learned
              to DJ, create events, design posters, and produce music on
              Ableton.
            </p>
            <Picture
              src="/blog/plantbassd.png"
              alt="Plant bass'd logo"
              style={plantbassdStyle}
            />
          </Group>
        </Paragraph>
      </SectionInView>

      <SectionInView delay={300}>
        <Paragraph>
          <Group align="center" gap="1rem 2rem" css={breakpoint}>
            <Picture
              src="/media/gaelic-ball.png"
              alt="Gaelic Ball"
              style={selfieStyle}
            />

            <p>
              I played{" "}
              <Anchor
                link="https://en.wikipedia.org/wiki/Gaelic_football"
                text="Gaelic football"
                variant="link"
              />{" "}
              and rugby growing up in Monaghan. In 2017, I played for Armagh RFC
              and represented Ulster Club u18s rugby in the inter-provincial
              series. I also played for Monaghan RFC, Ennis RFC, Corinthians
              RFC, and Barcelona GAA. In 2025, I completed the Barcelona Half
              Marathon in 1:44:00. Always looking forward to the next challenge!
            </p>
          </Group>
        </Paragraph>
      </SectionInView>

      <SectionInView delay={200}>
        <Paragraph>
          <Letterboxd />
        </Paragraph>
      </SectionInView>

      <SectionInView delay={400}>
        <Paragraph>
          <CustomSites>
            I&apos;m also open to building custom sites for people, including
            portfolios, blogs, event pages, and business sites. Take a look at
            my <Anchor link="/services" text="services" variant="link" /> page
            for details.
          </CustomSites>
        </Paragraph>
      </SectionInView>
    </Content>
  );
}
