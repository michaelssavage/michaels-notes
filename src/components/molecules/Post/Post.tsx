import type { IBlog } from "@/types/Post";
import { Link } from "@tanstack/react-router";
import { memo, useCallback, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DateText } from "./Date";
import { Description } from "./Description";
import { Card, CardInfo, Title } from "./Post.styled";

export const Post = memo(
	({ title, date, description, isExternal, slug, id, isFirst }: IBlog) => {
		const [isHovered, setIsHovered] = useState(false);

		const [ref, inView] = useInView({
			triggerOnce: true,
			threshold: 0.1,
		});

		const handleMouseEnter = useCallback(() => setIsHovered(true), []);
		const handleMouseLeave = useCallback(() => setIsHovered(false), []);

		const isExpanded = useMemo(
			() => isFirst || isHovered,
			[isFirst, isHovered],
		);

		return (
			<Card
				ref={ref}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				inView={inView}
			>
				<CardInfo>
					<Link to={isExternal ? isExternal : slug}>
						<Title
							layoutId={`blog-title-${id}`}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							{title}
						</Title>
					</Link>
					<DateText isExternal={isExternal}>{date}</DateText>
				</CardInfo>
				<Description
					description={description}
					isExternal={isExternal}
					slug={slug}
					isExpanded={isExpanded}
				/>
			</Card>
		);
	},
);
