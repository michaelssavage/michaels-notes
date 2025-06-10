import type { IBlog } from "@/types/Post";
import { useCallback, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DateText } from "./Date";
import { Description } from "./Description";
import { Card, CardInfo, Title } from "./Post.styled";

const Post = ({
	title,
	date,
	description,
	isExternal,
	slug,
	id,
	isFirst,
}: IBlog) => {
	const [isHovered, setIsHovered] = useState(false);

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	const isExpanded = useMemo(() => isFirst || isHovered, [isFirst, isHovered]);

	return (
		<article
			ref={ref}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			aria-labelledby={`post-title-${id}`}
		>
			<Card
				to={isExternal ? isExternal : `/blog/${slug}`}
				inView={inView}
				aria-label={`Read post: ${title}`}
			>
				<CardInfo>
					<Title
						id={`post-title-${id}`}
						layoutId={`blog-title-${id}`}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						{title}
					</Title>
					<DateText isExternal={isExternal}>{date}</DateText>
				</CardInfo>
				<Description 
					description={description} 
					isExpanded={isExpanded} 
					label={`Description for ${title}`}
				/>
			</Card>
		</article>
	);
};

export default Post;
