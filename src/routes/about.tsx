import imageUrl from "@/assets/images/cover.jpg";
import { Anchor } from "@/components/Anchor";
import { Picture } from "@/components/Picture";
import { Group } from "@/components/atoms/Group";
import {
  Container,
  Paragraph,
  Section,
  imageWrapperStyle,
} from "@/styles/routes/about.styled";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/about")({
  component: About,
});

const paragraphs = [
  {
    id: 0,
    value: (
      <Group direction="column" align="center">
        <Group align="center">
          <Picture
            src={imageUrl}
            alt="Picture of Me"
            style={imageWrapperStyle}
          />
          <p>
            From Ireland and currently based in{" "}
            <span className="underline">Barcelona, Spain.</span> I'm a developer
            that enjoys React.js, Typescript, Python, and Spring Boot. My world
            revolves around electronic music, movies, rugby, and travelling.
          </p>
        </Group>
      </Group>
    ),
  },
  {
    id: 2,
    value: `I studied Computer Applications in DCU and started working with Jaguar Land
    Rover, Shannon in 2021 where I learned to work with REST APIs using Spring
    Boot and React.js early on. I'm currently working with a startup in the
    heart of Barcelona, TalentBait, as a frontend developer using React.js.`,
  },
  {
    id: 3,
    value: `I'm passionate about films, and I love sharing and keeping track of them on
    Letterboxd (the best social media platform).`,
  },
  {
    id: 4,
    value: `I've played sports all my life including Gaelic Football for Clontibret
    O'Neills GFC and rugby for teams like Ulster Club u18s, Monaghan RFC, Ennis
    RFC, and Corinthians RFC. More recently I've joined a local running club and
    I'm preparing for the Barcelona half marathon!`,
  },
  {
    id: 5,
    value: (
      <>
        I co-created{" "}
        <Anchor
          variant="link"
          text="Plant Bass'd"
          link="/blog/what-is-plant-bassd"
        />
        , an electronic music blog and underground club night that set foot in
        Ireland and Scotland. Music is definitely a large part of my identity
        and I'm trying my hand at producing music on Ableton.
      </>
    ),
  },
];

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    paragraphs.map(() => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY - containerTop;
      const windowHeight = window.innerHeight;

      const newIndex = Math.round(scrollPosition / windowHeight);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < paragraphs.length
      ) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <Container ref={containerRef}>
      <AnimatePresence>
        {paragraphs.map(({ id, value }, index) => (
          <Section
            key={id}
            ref={sectionRefs.current[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paragraph>{value}</Paragraph>
          </Section>
        ))}
      </AnimatePresence>
    </Container>
  );
}
