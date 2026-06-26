import { DraftBadge } from "@/styles/routes/projects.styled";
import type { IBlog, IReview } from "@/types/Post";
import { useHydrated } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Description } from "./Description";
import {
  Card,
  CardInfo,
  DateText,
  getPostColor,
  PostType,
  Title,
} from "./Post.styled";
import PostSkeleton from "./PostSkeleton";

const Post = ({
  title,
  date,
  lastUpdated,
  description,
  isExternal,
  draft,
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

  const postColor = useMemo(() => {
    return getPostColor(isExternal, type === "review");
  }, [isExternal, type]);

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
        aria-label={`Read post: ${title}`}
        inView={hydrated ? inView : true}
        color={postColor}
      >
        {draft && <DraftBadge>Draft</DraftBadge>}
        <CardInfo>
          <PostType>{isExternal ? "plantbassd.com" : type}</PostType>
          <DateText>
            {date}
            <span className="last-updated">
              {lastUpdated ? ` (Updated ${lastUpdated})` : ""}
            </span>
          </DateText>
        </CardInfo>
        <Title id={`post-title-${slug}`}>{title}</Title>

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
