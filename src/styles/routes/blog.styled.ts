import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ButtonStyled } from "@/components/molecules/Button/Button.styled";
import { Wrapper } from "@/components/molecules/Picture/Picture.styled";
import type { FilterState } from "@/routes/index.lazy";
import { Col } from "@/styles/abstracts/layout.styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";

export const headerStyle = css`
  margin: 0 0.5rem 2rem;
`;

export const Heading = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.icon};
  span {
    color: ${({ theme }) => theme.colors.header};
  }
  ${forPhoneOnly(css`
    font-size: 1.5rem;
  `)}
`;

export const Page = styled.article`
  position: relative;
  min-height: 80vh;
`;

export const Panel = styled.div`
  margin: 2rem 5%;
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
  position: sticky;
  top: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 2rem;

  ${forTabletOnly(css`
    width: 100%;
    padding: 0 1rem;
  `)}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  ${ButtonStyled} {
    white-space: nowrap;
  }
`;

export const Header = styled(motion.h1)`
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.text};
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

const colors = {
	onSite: "#fb4d3d",
	isPlantBassd: "#3d89fb",
	isBite: "#f8af07",
};

export const Info = styled.p<{ filter: FilterState }>`
  opacity: 0.7;
  margin: 0.5rem 0;

  span {
    font-weight: normal;
    color: inherit;
    transition: color 0.3s ease, font-weight 0.3s ease;
  }

  ${({ filter }) => {
		const activeFilters = Object.values(filter).filter(Boolean).length;
		if (activeFilters !== 1) return "";

		return Object.keys(filter)
			.map((key) => {
				if (!filter[key as keyof FilterState]) return "";
				return `span[id=${key}] { 
        color: ${colors[key as keyof typeof colors]}; 
      }`;
			})
			.join("\n");
	}}
`;
