import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { memo } from "react";
import { Card, CardInfo, DescriptionWrapper } from "./Post.styled";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonElement = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 2s infinite ease-in-out;
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "1rem"};
`;

const PostSkeleton = memo(() => {
  return (
    <article>
      <Card
        to="#"
        inView={true}
        aria-label="Loading post..."
        style={{
          pointerEvents: "none",
        }}
      >
        <CardInfo>
          <div style={{ flex: 1 }}>
            <SkeletonElement width="70%" height="1.5rem" />
          </div>
          <div>
            <SkeletonElement width="4rem" height="1rem" />
          </div>
        </CardInfo>

        <div style={{ marginTop: "0.5rem" }}>
          <SkeletonElement width="6rem" height="0.9rem" />
        </div>

        <DescriptionWrapper
          isExpanded={false}
          contentHeight={44}
          style={{ marginTop: "0.5rem" }}
        >
          <SkeletonElement
            width="100%"
            height="1rem"
            style={{ marginBottom: "0.25rem" }}
          />
          <SkeletonElement width="80%" height="1rem" />
        </DescriptionWrapper>
      </Card>
    </article>
  );
});

PostSkeleton.displayName = "PostSkeleton";

export default PostSkeleton;
