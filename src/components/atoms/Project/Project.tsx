import { getContrastYIQ } from "@/lib/colors";
import {
  Card,
  CardBody,
  CardDescription,
  CardTechnology,
  CardTitle,
  CardWrapper,
  DraftBadge,
  TechTrack,
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

  const singleTech = data.technology.join(" / ");

  return (
    <CardWrapper $shouldDim={shouldDim} data-testid="project-card">
      {draft && <DraftBadge>Draft</DraftBadge>}
      <Card key={id} to={slug}>
        <CardBody bg={colors.bg} contrast={textContrast}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardBody>
        <CardTechnology
          bg={colors.bg}
          bodyContrast={textContrast}
          main={colors.main}
          contrast={titleContrast}
        >
          <TechTrack>
            <span>{singleTech}&nbsp;/&nbsp;</span>
            <span>{singleTech}&nbsp;/&nbsp;</span>
            <span>{singleTech}&nbsp;/&nbsp;</span>
            <span>{singleTech}&nbsp;/&nbsp;</span>
          </TechTrack>
        </CardTechnology>
      </Card>
    </CardWrapper>
  );
};
