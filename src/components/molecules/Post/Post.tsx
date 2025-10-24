import type { IBlog, IReview } from "@/types/Post";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Description } from "./Description";
import { Card, CardInfo, DateText, PostType, Title } from "./Post.styled";
import PostSkeleton from "./PostSkeleton";

const Post = ({
  title,
  date,
  description,
  isExternal,
  slug,
  isFirst,
  type,
}: IBlog | IReview) => {
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

  if (!inView) {
    return (
      <article ref={ref}>
        <PostSkeleton />
      </article>
    );
  }

  return (
    <article
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-labelledby={`post-title-${slug}`}
    >
      <Card
        to={isExternal ? isExternal : `/${type}/${slug}`}
        inView={inView}
        aria-label={`Read post: ${title}`}
        isExternal={isExternal}
        isReview={type === "review"}
      >
        <CardInfo>
          <Title>{title}</Title>
          <PostType>{type}</PostType>
        </CardInfo>

        <DateText>{date}</DateText>

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
