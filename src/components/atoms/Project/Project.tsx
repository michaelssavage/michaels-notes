import { getContrastYIQ } from "@/lib/colors";
import {
  Card,
  CardBody,
  CardTitle,
  CardWrapper,
  DraftBadge,
} from "@/styles/routes/projects.styled";
import type { IProject, ITechnology } from "@/types/Post";
import { useMemo } from "react";

interface Props {
  data: IProject;
  selectedTech: ITechnology | null;
}

export const Project = ({ data, selectedTech }: Props) => {
  const { id, slug, title, description, colors, draft } = data;
  const shouldDim = selectedTech && !data.technology.includes(selectedTech);

  const textContrast = useMemo(() => getContrastYIQ(colors.bg), [colors.bg]);
  const titleContrast = useMemo(
    () => getContrastYIQ(colors.main),
    [colors.main],
  );

  return (
    <CardWrapper $shouldDim={shouldDim} data-testid="project-card">
      {draft && <DraftBadge>Draft</DraftBadge>}
      <Card key={id} to={slug}>
        <CardTitle main={colors.main} contrast={titleContrast}>
          {title}
        </CardTitle>
        <CardBody bg={colors.bg} contrast={textContrast}>
          {description}
        </CardBody>
      </Card>
    </CardWrapper>
  );
};
