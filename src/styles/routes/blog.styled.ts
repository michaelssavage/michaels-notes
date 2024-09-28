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

  ${Col}:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
`;
