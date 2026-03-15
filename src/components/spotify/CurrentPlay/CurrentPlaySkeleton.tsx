import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    var(--color-white100) 25%,
    var(--color-gray) 50%,
    var(--color-white) 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: 0.2rem;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  height: 150px;
  background-color: var(--color-white100);
  padding: 0.6rem 0.8rem 1.2rem;
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 40%;
  height: 100%;
`;

const SkeletonContent = styled(SkeletonBase)`
  width: 100%;
  height: 100%;
`;

export const CurrentPlaySkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonContent />
    </SkeletonContainer>
  );
};
