import { Group } from "@/components/atoms/Group";
import { shimmerAnimation } from "@/styles/abstracts/animations.styled";
import styled from "@emotion/styled";

const SkeletonBar = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  ${shimmerAnimation()};
  border-radius: 4px;
  width: ${({ width }) => width || "30%"};
  height: ${({ height }) => height || "3rem"};
`;

const WakeNotice = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-gray600);
  max-width: 36rem;
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.65rem;
`;

export function WorksheetSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <Group direction="column" gap="1.5rem">
        <WakeNotice>
          The worksheet service sleeps when not in use, so it may be waking up
          after idle time. The first load can take up to a minute and the page
          will update when the data is ready.
        </WakeNotice>

        <SectionBlock>
          <SkeletonBar />

          <SectionBlock>
            {Array.from({ length: 10 }, (_, i) => (
              <SkeletonBar key={i} width="90%" height="2rem" />
            ))}
          </SectionBlock>
        </SectionBlock>
      </Group>
    </div>
  );
}
