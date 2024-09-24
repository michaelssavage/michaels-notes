import {
  Card,
  CardInfo,
  DateText,
  Description,
  Title,
} from "@/components/Post/Post.styled";
import type { IBlog } from "@/types/Post";
import { Link } from "@tanstack/react-router";
import { Anchor } from "../Anchor";

export const Post = ({
  title,
  date,
  description,
  isExternal,
  slug,
  id,
  isFirst,
}: IBlog) => {
  return (
    <Card>
      <CardInfo>
        <Link to={isExternal ? isExternal : slug}>
          <Title
            layoutId={`blog-title-${id}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {title}
          </Title>
        </Link>
        <DateText>{date}</DateText>
      </CardInfo>
      <Description isFirst={isFirst}>
        {description}{" "}
        {isExternal ? (
          <Anchor
            link={isExternal}
            variant="link"
            text="Read More"
            isExternal
          />
        ) : (
          <Anchor text="Read More" variant="link" link={slug} />
        )}
      </Description>
    </Card>
  );
};
