import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const l10Animation = keyframes`
  100% {background-size:120% 120%}
`;

const Loader = styled.div<{ width?: string; height?: string }>`
  width: 120px;
  height: 60px;
  border-radius: 200px 200px 0 0;
  mask: repeating-radial-gradient(
    farthest-side at bottom,
    #0000 0,
    #000 1px 12%,
    #0000 calc(12% + 1px) 20%
  );

  -webkit-mask: repeating-radial-gradient(
    farthest-side at bottom,
    #0000 0,
    #000 1px 12%,
    #0000 calc(12% + 1px) 20%
  );
  background: radial-gradient(
      farthest-side at bottom,
      var(--color-purple) 0 95%,
      #0000 0
    )
    bottom/0% 0% no-repeat var(--color-gray);
  animation: ${l10Animation} 2s infinite steps(6);

  ${forPhoneOnly(css`
    margin: 0 auto;
  `)}
`;

const WakeNotice = styled.p`
  font-size: 1.2rem;
  line-height: 1.45;
  color: var(--color-gray600);
  max-width: 36rem;
`;

export function WorksheetSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <Group direction="row" gap="2rem" align="center" wrap="wrap">
        <Loader />
        <WakeNotice>
          This service uses the free tier of{" "}
          <Anchor
            link="https://railway.com"
            text="Railway.com"
            variant="link"
            isExternal
          />
          , so it sleeps when not in use. Wait for it to wake up before
          refreshing the page. The first load can take up to a minute and the
          page will update when the data is ready.
        </WakeNotice>
      </Group>
    </div>
  );
}
