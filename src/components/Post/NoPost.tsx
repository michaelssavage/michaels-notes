import notFoundImg from "@/assets/images/not-found.png";
import { NotFound } from "@/components/Picture/Picture.styled";
import { Card, EmptyCard, Title } from "@/components/Post/Post.styled";

export const NoPost = () => {
  return (
    <Card>
      <EmptyCard>
        <NotFound src={notFoundImg} alt="src not found" />
        <Title>No posts found</Title>
      </EmptyCard>
    </Card>
  );
};
