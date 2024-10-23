import { ButtonStyled } from "@/components/molecules/Button/Button.styled";
import { Wrapper } from "@/components/molecules/Picture/Picture.styled";
import { Col } from "@/styles/abstracts/layout.styled";
import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Page = styled.section`
  position: relative;
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
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;

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

export const Article = styled(motion.article)`
  margin: 2rem auto 2rem 40%;
  width: 50%;

  ${forPhoneOnly(css`
    width: 90%;
    margin: 2rem auto;
  `)}
`;

export const Tags = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Paths = styled.div`
  ${forTabletOnly(css`
    left: -9rem;
  `)}

  ${forPhoneOnly(css`
    width: 90%;
    position: static;
  `)}
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 12rem;
  left: 2rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;

  ${forTabletOnly(css`
    visibility: hidden;
  `)}
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
