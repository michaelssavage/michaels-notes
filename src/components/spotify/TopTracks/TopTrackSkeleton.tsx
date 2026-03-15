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

const SkeletonCard = styled.div`
  flex: 0 0 auto;
  width: 10rem;
  background-color: var(--color-white100);
  border-radius: 0.4rem;
  padding: 0.7rem 1.4rem 0.7rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

const SkeletonTrackName = styled(SkeletonBase)`
  height: 0.9rem;
  width: 75%;
`;

const SkeletonArtistName = styled(SkeletonBase)`
  height: 0.65rem;
  width: 55%;
`;

const SkeletonContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.6rem 0;
  height: 70px;
  overflow: hidden;
`;

export const TopTrackSkeleton = () => {
  return (
    <div>
      <SkeletonContainer>
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonCard key={i}>
            <SkeletonTrackName />
            <SkeletonArtistName />
          </SkeletonCard>
        ))}
      </SkeletonContainer>
    </div>
  );
};
