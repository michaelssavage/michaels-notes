import { ButtonStyled } from "@/components/molecules/Button/Button.styled";
import { Wrapper } from "@/components/molecules/Picture/Picture.styled";
import { slideInAnimation } from "@/styles/abstracts/animations.styled";
import { Col } from "@/styles/abstracts/layout.styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Heading = styled.h1`
  margin: 0;
  color: var(--color-black);
`;

export const Page = styled.section`
  position: relative;
  min-height: 80vh;
`;

export const Panel = styled.div`
  margin: 1rem 10% 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${Col}:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  ${forPhoneOnly(css`
    margin: 1rem 5%;
  `)}
`;

export const RowStyle = css`
  ${forTabletOnly(css`
    flex-direction: column;

    & > ${Col}:first-of-type {
      order: 2;
    }

    & > ${Col}:last-of-type {
      order: 1;
      padding: 0;
    }
  `)}
`;

export const Filter = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p[data-id="filter-post-title"] {
    color: var(--color-gray600);
  }

  ${forPhoneOnly(css`
    width: 100%;
  `)}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  ${ButtonStyled} {
    white-space: nowrap;
    color: var(--color-gray600);
  }

  ${ButtonStyled}[data-active="true"] {
    font-weight: 600;

    svg[data-id="onSite"] {
      fill: var(--color-red200);
    }

    svg[data-id="isPlantBassd"] {
      fill: var(--color-blue200);
    }

    svg[data-id="isReview"] {
      fill: var(--color-purple200);
    }

    svg[data-id="isBite"] {
      fill: var(--color-yellow300);
    }
  }
`;

export const Header = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-black);
  ${slideInAnimation("20px", "vertical", "0.4s", "forwards")}
`;

export const MovieInfo = styled.p`
  margin-bottom: 1rem;
  color: var(--color-gray500);
`;

export const MainSection = styled.div`
  width: 70%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 0 0.5rem;
`;

export const Article = styled.article<{ height?: string }>`
  margin: 1rem auto 2rem;
  width: 50%;
  min-height: ${({ height }) => height};

  ${forPhoneOnly(css`
    width: 90%;
    margin: 3rem auto 2rem;
  `)}
`;

export const Content = styled.div`
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ImgPositioner = styled.div`
  position: absolute;
  left: -6rem;

  ${Wrapper} {
    width: 90px;
  }

  ${forPhoneOnly(css`
    left: unset;
    right: 0;
    top: -3rem;

    ${Wrapper} {
      width: 60px;
    }
  `)}
`;

export const Info = styled.p`
  color: var(--color-gray600);
  margin: 0.5rem 0;

  span {
    color: var(--color-gray600);
  }

  &[data-filter*="onSite"] span[data-id="onSite"] {
    color: var(--color-red200);
    font-weight: 600;
  }

  &[data-filter*="isPlantBassd"] span[data-id="isPlantBassd"] {
    color: var(--color-blue200);
    font-weight: 600;
  }

  &[data-filter*="isReview"] span[data-id="isReview"] {
    color: var(--color-purple200);
    font-weight: 600;
  }

  &[data-filter*="isBite"] span[data-id="isBite"] {
    color: var(--color-yellow300);
    font-weight: 600;
  }
`;
