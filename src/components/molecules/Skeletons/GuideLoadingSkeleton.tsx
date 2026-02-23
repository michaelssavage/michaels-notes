import { Group } from "@/components/atoms/Group";
import { shimmerAnimation } from "@/styles/abstracts/animations.styled";
import { Card } from "@/styles/routes/guide.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { memo } from "react";

const SkeletonElement = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  ${shimmerAnimation()};
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "1rem"};
`;

const GuideLoadingSkeleton = memo(() => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <SkeletonElement width="100%" height="10rem" />

          <Group
            direction="column"
            gap="0.25rem"
            css={css`
              padding: 0.5rem 1rem 0.25rem;
              margin-bottom: 0.5rem;
            `}
          >
            <SkeletonElement width="50%" height="2rem" />
            <SkeletonElement width="100%" height="1.2rem" />
            <SkeletonElement width="100%" height="1.2rem" />
            <SkeletonElement width="40%" height="2rem" />
          </Group>
        </Card>
      ))}
    </>
  );
});

GuideLoadingSkeleton.displayName = "GuideLoadingSkeleton";

export default GuideLoadingSkeleton;
