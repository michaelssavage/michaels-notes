import { DraftBadge } from "@/styles/routes/projects.styled";
import type { IBlog, IReview } from "@/types/Post";
import { useState } from "react";
import { Description } from "./Description";
import {
  Card,
  CardInfo,
  DateText,
  getPostColor,
  PostType,
  Title,
  Views,
} from "./Post.styled";

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
  views,
}: IBlog | IReview) => {
  const [isHovered, setIsHovered] = useState(false);

  // The first post is always expanded; the others expand on hover.
  const isExpanded = isFirst || isHovered;
  const postColor = getPostColor(isExternal, type === "review");

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`post-title-${slug}`}
    >
      <Card
        to={isExternal ? isExternal : `/${type}/${slug}`}
        aria-label={`Read post: ${title}`}
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

        {!isExternal && (
          <Views>
            {views ?? 0} {views === 1 ? "view" : "views"}
          </Views>
        )}

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
