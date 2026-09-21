import { popOutInfinitely } from "@/styles/abstracts/animations.styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ServicesContainer = styled.div`
  margin: 1rem auto 2rem;
  max-width: 900px;

  ${forPhoneOnly(css`
    margin: 1rem 5%;
  `)}
`;

const grainOverlay = css`
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

export const ServicesPage = styled.section`
  position: relative;
  min-height: 80vh;
  isolation: isolate;
  background-color: var(--color-yellow);
  padding-top: 2rem;

  ${forTabletOnly(css`
    margin-top: 5rem;
  `)}

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const Heading = styled.div`
  position: relative;
  overflow: hidden;
  background-color: var(--color-yellow200);
  border: 1px solid var(--color-black);
  box-shadow: rgba(45, 36, 31, 0.5) 18px 12px;
  padding: 1rem;
  width: 60vw;
  transform: skew(-6deg);
  margin: 0 1rem;

  ${forTabletOnly(css`
    width: 70vw;
  `)}

  ${forPhoneOnly(css`
    max-width: 100%;
  `)}

  &::after {
    ${grainOverlay}
  }

  h1 {
    position: relative;
    overflow: hidden;
    margin: 0;
    color: var(--color-red200);
    text-wrap: pretty;
  }
`;

export const Lede = styled.p`
  max-width: 70vw;
  font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);

  && a {
    font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);
  }

  ${forPhoneOnly(css`
    max-width: 100%;
  `)}
`;

export const List = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1.25rem;
  color: var(--color-black);
  font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);
`;

export const PriceCallout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 2px dashed var(--color-black);
  padding: 1rem;
  background-color: var(--color-white);
  border-radius: 8px;

  p {
    margin: 0;
    font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);
  }

  a {
    margin-left: auto;
  }

  strong {
    color: var(--color-black);
  }

  ${forPhoneOnly(css`
    width: 100%;
  `)}
`;

const Sticker = styled.div`
  width: 180px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Xtra = styled(Sticker)`
  width: 160px;
  position: absolute;
  top: -8rem;
  right: -2rem;

  ${popOutInfinitely()}

  ${forTabletOnly(css`
    top: -6rem;
    right: 0;
    width: 100px;
  `)}
`;

export const Content = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1.5rem 2.5rem;
  position: relative;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;

  ${forTabletOnly(css`
    grid-template-columns: 1fr;
  `)}
`;

export const SiteCard = styled.a`
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray400);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: var(--color-black);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border: 1px solid var(--color-black);
  }

  figure {
    margin: 0;
    height: auto;
  }

  img {
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }
`;

export const SiteTitle = styled.p`
  margin: 0;
  padding: 0.75rem 0.5rem 1rem;
  text-align: center;
  font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
`;
