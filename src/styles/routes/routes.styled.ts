import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MiscContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem 10% 2rem;
  font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);
`;

export const masonryImgStyles = css`
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
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
  height: min(calc(100vh - 110px), 900px);
  min-height: 320px;
  position: sticky;
  top: 70px;

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
  margin-bottom: 1rem;
`;
