import { expandAndAppear } from "@/styles/abstracts/animations.styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Div = styled.div`
  display: block;
`;

export const Homework = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: var(--color-blue200) 5px 5px;
  background-color: var(--color-blue50);
  width: 100%;
  padding: 1rem;

  & > div {
    border-bottom: 1px solid var(--color-blue200);
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
`;

export const MiscContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem 10% 2rem;
  font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);
`;

export const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  ${forPhoneOnly(css`
    grid-template-columns: 1fr;
  `)}
`;

export const masonryImgStyles = css`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background-color: var(--color-white);
  cursor: zoom-out;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  ${expandAndAppear("0.2s")}
`;

export const SplitView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;

  ${forTabletOnly(css`
    flex-direction: column;
  `)}
`;

export const SplitPanel = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > [data-id="guide-header"] {
    margin-top: 1rem;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const SplitMap = styled.div`
  flex: 1 1 50%;
  width: 100%;
  height: min(calc(100vh - 16rem - 1rem), 900px);
  min-height: 320px;
  position: sticky;
  top: calc(16rem + 1rem);

  ${forTabletOnly(css`
    position: static;
    height: 70vh;
    min-height: 360px;
    display: none;
  `)}
`;

export const WorksheetDate = styled.p`
  font-size: 0.8rem;
  color: var(--color-gray600);
  font-weight: 500;
`;

export const WorksheetHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MixedViewToggle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 1rem;
`;
