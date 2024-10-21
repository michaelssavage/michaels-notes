import plantbassdImg from "@/assets/images/blog/plantbassd.png";
import selfieImg from "@/assets/images/cover.jpg";
import { Anchor } from "@/components/Anchor";
import { CountdownClock } from "@/components/Countdown/Countdown";
import { Floating } from "@/components/Floating/Floating";
import { Picture } from "@/components/Picture";
import { Letterboxd } from "@/components/about/Letterboxd";
import { Group } from "@/components/atoms/Group";
import { Weather } from "@/components/atoms/Weather";
import { forBreakAt } from "@/styles/abstracts/mixins.styled";
import { plantbassdStyle, selfieStyle } from "@/styles/routes/about.styled";
import { css } from "@emotion/react";

export const breakpoint = forBreakAt({
  breakpoint: 900,
  styles: css`
    flex-direction: column;
  `,
});

export const paragraphs = [
  {
    id: 0,
    value: (
      <Group align="center" gap="2rem" style={breakpoint}>
        <Picture src={selfieImg} alt="Picture of Me" style={selfieStyle} />
        <p>
          From Ireland and currently based in{" "}
          <Floating
            type="tooltip"
            trigger={<span className="underline">Barcelona, Spain.</span>}
            content={<Weather />}
          />{" "}
          I'm a developer that enjoys developing with React.js, Typescript, and
          Python. My world revolves around electronic music, movies, rugby, and
          travelling.
        </p>
      </Group>
    ),
  },
  {
    id: 2,
    value: (
      <p>
        I studied Computer Applications in DCU and started working with Jaguar
        Land Rover, Shannon in 2021 where I learned to work with REST APIs using
        Spring Boot and React.js early on. I'm currently working with a startup
        in the heart of Barcelona, TalentBait, as a frontend developer using
        React.js.
      </p>
    ),
  },
  {
    id: 3,
    value: <Letterboxd />,
  },
  {
    id: 4,
    value: (
      <Group direction="column" align="center">
        <p>
          I like to keep fit and healthy, having played sports all my life
          including Gaelic Football and rugby for teams like Ulster Club u18s,
          Monaghan RFC, Ennis RFC, and Corinthians RFC. More recently I've
          joined a local running club and I'm preparing for the Barcelona half
          marathon!
        </p>
        <CountdownClock targetDate="2025-02-16T00:00:00" />
      </Group>
    ),
  },
  {
    id: 5,
    value: (
      <Group align="center" gap="2rem" style={breakpoint}>
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
          , an electronic music blog and underground club night that that took
          hold in Ireland and Scotland. Music is definitely a large part of my
          identity and I'm always trying my hand at producing music on Ableton.
        </p>
      </Group>
    ),
  },
];
