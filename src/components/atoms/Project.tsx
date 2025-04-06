import {
	Card,
	CardBody,
	CardTitle,
	CardWrapper,
} from "@/styles/routes/projects.styled";
import type { IProject } from "@/types/Post";

interface Props {
	data: IProject;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

export const Project = ({ data, onMouseEnter, onMouseLeave }: Props) => {
	const { id, slug, title, description, colors } = data;
	return (
		<CardWrapper>
			<Card
				key={id}
				to={slug}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<CardTitle main={colors.main}>{title}</CardTitle>
				<CardBody bg={colors.bg}>{description}</CardBody>
			</Card>
		</CardWrapper>
	);
};
