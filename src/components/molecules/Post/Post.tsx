import type { IBlog } from "@/types/Post";
import { useSpring } from "@react-spring/web";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  type,
}: IBlog) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // Trigger once
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const isExpanded = useMemo(() => isFirst || isHovered, [isFirst, isHovered]);

  const spring = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    config: { tension: 300, friction: 30 },
  });

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
          <Title style={spring}>{title}</Title>
          <DateText isExternal={isExternal} isReview={type === "review"}>
            {date}
          </DateText>
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
