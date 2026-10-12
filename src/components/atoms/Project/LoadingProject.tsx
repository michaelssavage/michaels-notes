import { shimmerAnimation } from "@/styles/abstracts/animations.styled";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const shimmer = css`
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  ${shimmerAnimation()};
`;

export const LoadingRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  align-items: center;
  gap: 1.5rem;

  ${forPhoneOnly(css`
    grid-template-columns: 1fr;
    gap: 0.75rem;
  `)}
`;

export const LoadingCover = styled.div`
  aspect-ratio: 16 / 10;
  ${shimmer};
`;

export const LoadingLine = styled.div<{ width: string }>`
  height: 1rem;
  width: ${({ width }) => width};
  margin-bottom: 0.75rem;
  ${shimmer};
`;

export const LoadingProject = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <LoadingRow key={index}>
      <LoadingCover />
      <div>
        <LoadingLine width="30%" />
        <LoadingLine width="60%" />
        <LoadingLine width="90%" />
      </div>
    </LoadingRow>
  ));
};
