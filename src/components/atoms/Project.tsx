import {
	Card,
	CardBody,
	CardTitle,
	CardWrapper,
} from "@/styles/routes/projects.styled";
import type { IProject, ITechnology } from "@/types/Post";

interface Props {
	data: IProject;
	selectedTech: ITechnology | null;
}

export const Project = ({ data, selectedTech }: Props) => {
	const { id, slug, title, description, colors } = data;

	const shouldDim = selectedTech && !data.technology.includes(selectedTech);
	return (
		<CardWrapper $shouldDim={shouldDim} data-testid="project-card">
			<Card key={id} to={slug}>
				<CardTitle main={colors.main}>{title}</CardTitle>
				<CardBody bg={colors.bg}>{description}</CardBody>
			</Card>
		</CardWrapper>
	);
};
