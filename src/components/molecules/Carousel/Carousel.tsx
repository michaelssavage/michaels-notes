import { Project } from "@/components/atoms/Project";
import {
	CarouselContainer,
	CarouselTrack,
} from "@/components/molecules/Carousel/Carousel.styled";
import type { IProject } from "@/types/Post";
import {
	type MouseEvent as ReactMouseEvent,
	type TouchEvent as ReactTouchEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

interface Props {
	slides: Array<IProject>;
	hasFiltered: boolean;
}

const Carousel = ({ slides, hasFiltered }: Props) => {
	const [translate, setTranslate] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartX, setDragStartX] = useState(0);
	const [dragOffset, setDragOffset] = useState(0);

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

	const handleDragStart = useCallback(
		(e: ReactMouseEvent | ReactTouchEvent) => {
			const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

			setIsDragging(true);
			setIsPaused(true);
			setDragStartX(clientX || 0);
			setDragOffset(translate);
		},
		[translate],
	);

	const handleDragMove = useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (!isDragging) return;

			const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
			if (typeof clientX !== "number") return;

			const dragDistance = clientX - dragStartX;
			setTranslate(dragOffset + dragDistance);
		},
		[isDragging, dragStartX, dragOffset],
	);

	const handleDragEnd = useCallback(() => {
		setIsDragging(false);
		setTimeout(() => {
			if (!containerRef.current?.matches(":hover")) {
				setIsPaused(false);
			}
		}, 100);
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				handleDragMove(e);
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (isDragging) {
				handleDragMove(e);
			}
		};

		const handleMouseUp = () => {
			if (isDragging) {
				handleDragEnd();
			}
		};

		const handleTouchEnd = () => {
			if (isDragging) {
				handleDragEnd();
			}
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};
	}, [isDragging, handleDragMove, handleDragEnd]);

	return (
		<CarouselContainer ref={containerRef}>
			<CarouselTrack
				x={translate}
				isPaused={isPaused || hasFiltered}
				onMouseDown={handleDragStart}
				onTouchStart={handleDragStart}
			>
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

export default Carousel;
