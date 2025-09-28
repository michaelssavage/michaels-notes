import { ButtonStyled } from "@/components/molecules/Button/Button.styled";
import { Wrapper } from "@/components/molecules/Picture/Picture.styled";
import { Col } from "@/styles/abstracts/layout.styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";

export const Heading = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.black};
`;

export const Page = styled.article`
  position: relative;
  min-height: 80vh;
`;

export const Panel = styled.div`
  margin: 2rem 10%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${Col}:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p[data-id="filter-post-title"] {
    color: ${({ theme }) => theme.gray600};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  ${ButtonStyled} {
    white-space: nowrap;
    color: ${({ theme }) => theme.gray600};
  }

  ${ButtonStyled}[data-active="true"] {
    font-weight: 600;

    svg[data-id="onSite"] {
      fill: ${({ theme }) => theme.red200};
    }

    svg[data-id="isPlantBassd"] {
      fill: ${({ theme }) => theme.blue200};
    }

    svg[data-id="isReview"] {
      fill: ${({ theme }) => theme.purple200};
    }

    svg[data-id="isBite"] {
      fill: ${({ theme }) => theme.yellow300};
    }
  }
`;

export const Header = styled(animated.h1)`
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.black};
  will-change: transform;
`;

export const MainSection = styled.div`
  width: 70%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 0 0.5rem;
`;

// Article styling
export const Article = styled.article<{ height?: string }>`
  margin: 2rem auto;
  width: 50%;
  min-height: ${({ height }) => height};

  ${forPhoneOnly(css`
    width: 90%;
  `)}
`;

export const Tags = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.black};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  color: ${({ theme }) => theme.gray600};
  margin: 0.5rem 0;

  span {
    color: ${({ theme }) => theme.gray600};
  }

  &[data-filter*="onSite"] span[data-id="onSite"] {
    color: ${({ theme }) => theme.red200};
    font-weight: 600;
  }

  &[data-filter*="isPlantBassd"] span[data-id="isPlantBassd"] {
    color: ${({ theme }) => theme.blue200};
    font-weight: 600;
  }

  &[data-filter*="isReview"] span[data-id="isReview"] {
    color: ${({ theme }) => theme.purple200};
    font-weight: 600;
  }

  &[data-filter*="isBite"] span[data-id="isBite"] {
    color: ${({ theme }) => theme.yellow300};
    font-weight: 600;
  }
`;
