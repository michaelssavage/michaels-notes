import { Project } from "@/components/atoms/Project";
import {
	CarouselContainer,
	CarouselTrack,
} from "@/components/molecules/Carousel/Carousel.styled";
import type { IProject } from "@/types/Post";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Props {
	slides: Array<IProject>;
	hasFiltered: boolean;
}

export const Carousel = ({ slides, hasFiltered }: Props) => {
	const [translate, setTranslate] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const animationRef = useRef<number>();
	const previousTimeRef = useRef<number>(0);

	const allSlides = useMemo(() => {
		return hasFiltered ? slides : [...slides, ...slides];
	}, [slides, hasFiltered]);

	useEffect(() => {
		const updateWidth = () => {
			if (containerRef.current) {
				setWidth(containerRef.current.offsetWidth);
			}
		};

		updateWidth();

		const resizeObserver = new ResizeObserver(updateWidth);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	const animate = useCallback(
		(timestamp: number) => {
			if (!previousTimeRef.current) previousTimeRef.current = timestamp;
			const elapsed = timestamp - previousTimeRef.current;

			// Update animation at 60fps rate (roughly every 16ms)
			if (elapsed > 16) {
				previousTimeRef.current = timestamp;
				setTranslate((prevTranslate) => {
					const newTranslate = prevTranslate - 1;
					if (Math.abs(newTranslate) >= width && width > 0) {
						return 0;
					}
					return newTranslate;
				});
			}

			animationRef.current = requestAnimationFrame(animate);
		},
		[width],
	);

	useEffect(() => {
		if (!isPaused && !hasFiltered) {
			animationRef.current = requestAnimationFrame(animate);
		} else {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [animate, isPaused, hasFiltered]);

	useEffect(() => {
		if (hasFiltered) {
			setTranslate(0);
		}

		if (!isPaused && !hasFiltered && slides.length > 0) {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			previousTimeRef.current = 0;
			animationRef.current = requestAnimationFrame(animate);
		} else {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [animate, isPaused, hasFiltered, slides.length]);

	const handleMouseEnter = useCallback(() => {
		setIsPaused(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsPaused(false);
	}, []);

	return (
		<CarouselContainer ref={containerRef}>
			<CarouselTrack x={translate} isPaused={isPaused || hasFiltered}>
				{allSlides.map((slide, index) => (
					<Project
						key={`${slide.id}-${index}`}
						data={slide}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
				))}
			</CarouselTrack>
		</CarouselContainer>
	);
};
