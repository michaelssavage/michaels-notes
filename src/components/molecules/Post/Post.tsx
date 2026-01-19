import type { IBlog, IReview } from "@/types/Post";
import { useHydrated } from "@tanstack/react-router";
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
  const [inView, setInView] = useState(true);
  const ref = useRef<HTMLElement | null>(null);

  const hydrated = useHydrated();

  useEffect(() => {
    if (!ref.current || !hydrated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hydrated]);

  const handleMouseEnter = useCallback(() => {
    if (hydrated) setIsHovered(true);
  }, [hydrated]);

  const handleMouseLeave = useCallback(() => {
    if (hydrated) setIsHovered(false);
  }, [hydrated]);

  const isExpanded = useMemo(() => isFirst || isHovered, [isFirst, isHovered]);

  if (hydrated && !inView) {
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
        inView={hydrated ? inView : true}
        aria-label={`Read post: ${title}`}
        isExternal={isExternal}
        isReview={type === "review"}
      >
        <CardInfo>
          <Title id={`post-title-${slug}`}>{title}</Title>
          <PostType>
            {isExternal && "ext. "}
            {type}
          </PostType>
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
