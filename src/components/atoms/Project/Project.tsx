import { getContrastYIQ } from "@/lib/colors";
import {
  CoverTechnology,
  DraftBadge,
  ProjectCover,
  ProjectDescription,
  ProjectInfo,
  ProjectRow,
  ProjectTitle,
  TechTrack,
} from "@/styles/routes/projects.styled";
import type { IProject } from "@/types/Post";
import { useMemo } from "react";

interface Props {
  data: IProject;
}

export const Project = ({ data }: Props) => {
  const { slug, title, date, description, colors, draft, image } = data;

  const coverContrast = useMemo(() => getContrastYIQ(colors.bg), [colors.bg]);
  const mainContrast = useMemo(
    () => getContrastYIQ(colors.main),
    [colors.main],
  );

  const singleTech = data.technology.join(" / ");

  return (
    <ProjectRow to={slug} data-testid="project-card">
      <ProjectCover bg={colors.bg} main={colors.main} contrast={coverContrast}>
        {draft && <DraftBadge>Draft</DraftBadge>}
        <div data-id="cover-media">
          {image ? (
            <img src={image} alt={`${title} screenshot`} loading="lazy" />
          ) : (
            <span data-id="cover-title">{title}</span>
          )}
        </div>
        <CoverTechnology
          bg={colors.bg}
          bodyContrast={coverContrast}
          main={colors.main}
          contrast={mainContrast}
        >
          <TechTrack>
            <span>{singleTech}&nbsp;/&nbsp;</span>
            <span>{singleTech}&nbsp;/&nbsp;</span>
            <span>{singleTech}&nbsp;/&nbsp;</span>
            <span>{singleTech}&nbsp;/&nbsp;</span>
          </TechTrack>
        </CoverTechnology>
      </ProjectCover>
      <ProjectInfo>
        <p className="date">{date}</p>
        <ProjectTitle main={colors.main}>{title}</ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
      </ProjectInfo>
    </ProjectRow>
  );
};
