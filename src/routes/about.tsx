import { MetaData } from "@/components/atoms";
import { PARAGRAPHS } from "@/components/atoms/Paragraph";
import { Container, Paragraph, Section } from "@/styles/routes/about.styled";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/about")({
	component: About,
});

const description =
	"I'm a developer that enjoys developing with React.js, Typescript, and Python. My world revolves around electronic music, movies, rugby, and travelling.";

function About() {
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
		PARAGRAPHS.map(() => createRef<HTMLDivElement>()),
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
				newIndex < PARAGRAPHS.length
			) {
				setActiveIndex(newIndex);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [activeIndex]);

	return (
		<Container>
			<MetaData title="About Me" description={description} />
			<AnimatePresence>
				{PARAGRAPHS.map(({ id, value }, index) => (
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
