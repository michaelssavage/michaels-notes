import notFoundImg from "@/assets/images/not-found.png";
import { NotFound } from "@/components/molecules/Picture/Picture.styled";
import { Card, EmptyCard, Title } from "./Post.styled";

export const NoPost = () => {
	return (
		<Card inView>
			<EmptyCard>
				<NotFound src={notFoundImg} alt="src not found" />
				<Title>No posts found</Title>
			</EmptyCard>
		</Card>
	);
};
