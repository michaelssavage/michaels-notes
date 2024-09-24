import { forPhoneOnly, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// Page styling
export const Page = styled.section`
  position: relative;
`;

// Container styling
export const Container = styled.div`
  margin: 2rem 5%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Search wrapper and search box styling
export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 2px solid ${({ theme }) => theme.colors.text};
    border-radius: 9999px;
    width: 100%;

    &:focus {
      outline: solid 2px ${({ theme }) => theme.colors.mint};
    }
  }

  svg {
    position: absolute;
    left: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.hoverText};
  }
`;

// Color key styling
export const ColorKey = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  position: relative;

  p {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    z-index: 3;
  }
`;

// Unused item styling
export const Unused = styled.div`
  svg {
    stroke-width: 1;
    stroke: grey;
    fill: transparent;
  }
`;

// Header styling
export const Header = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  will-change: transform;
`;

// Article styling
export const Article = styled.div`
  margin: 2rem auto 2rem 40%;
  width: 50%;

  ${forPhoneOnly(css`
    width: 90%;
    margin: 2rem auto;
  `)}
`;

// Tags styling
export const Tags = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

// Content styling
export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Paths styling
export const Paths = styled.div`
  ${forTabletOnly(css`
    left: -9rem;
  `)}

  ${forPhoneOnly(css`
    width: 90%;
    position: static;
  `)}
`;

// Sidebar styling
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
