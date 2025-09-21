import { NotFound } from "@/components/molecules/Picture/Picture.styled";
import { Card, EmptyCard, Title } from "./Post.styled";

export const NoPost = () => {
  return (
    <Card inView>
      <EmptyCard>
        <NotFound src="/not-found.png" alt="src not found" />
        <Title>No posts found</Title>
      </EmptyCard>
    </Card>
  );
};
