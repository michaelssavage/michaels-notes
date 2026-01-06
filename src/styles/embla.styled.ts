import { forBreakAt } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Embla = styled.div`
  max-width: 30vw;
  margin: auto;
  --slide-height: 19rem;
  --slide-spacing: 1rem;
  --slide-size: 50%;

  ${forBreakAt({
    breakpoint: 900,
    styles: css`
      max-width: 50vw;
    `,
  })}

  ${forBreakAt({
    breakpoint: 450,
    styles: css`
      max-width: 70vw;
    `,
  })}
`;

const EmblaViewport = styled.div`
  overflow: hidden;
`;

const EmblaContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const EmblaSlide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
`;

const SlideInner = styled.div`
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  border-radius: 1.8rem;
  font-size: 4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--slide-height);
  user-select: none;
`;

export { Embla, EmblaContainer, EmblaSlide, EmblaViewport, SlideInner };
