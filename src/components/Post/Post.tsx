import { Description } from "@/components/Post/Description";
import { Card, CardInfo, DateText, Title } from "@/components/Post/Post.styled";
import type { IBlog } from "@/types/Post";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Post = ({
  title,
  date,
  description,
  isExternal,
  slug,
  id,
  isFirst,
}: IBlog) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        isFirst={isFirst}
        description={description}
        isExternal={isExternal}
        slug={slug}
        isHovered={isHovered}
      />
    </Card>
  );
};
