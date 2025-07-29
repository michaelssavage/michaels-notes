import { useSpring } from "@react-spring/web";
import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "@/styles/routes/home.styled";

interface SectionI {
	children: ReactNode;
	delay?: number;
	main: string;
	bg?: string;
}

export const SectionInView = ({ children, delay = 0, main, bg }: SectionI) => {
	const [ref, inView] = useInView({
		threshold: 0.2, // Trigger when 20% of the element is visible
		triggerOnce: true,
	});

	const spring = useSpring({
		opacity: inView ? 1 : 0,
		transform: inView ? "translateY(0px)" : "translateY(40px)",
		config: {
			tension: 280,
			friction: 60,
		},
		delay: inView ? delay : 0,
	});

	return (
		<Section ref={ref} style={spring} main={main} bg={bg}>
			{children}
		</Section>
	);
};
