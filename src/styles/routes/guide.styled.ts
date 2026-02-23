import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const BasicLink = styled.a`
  color: var(--color-green300);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  flex-wrap: wrap;
  width: fit-content;

  &:hover {
    color: var(--color-green200);
  }
`;

export const EditLink = styled(Link)`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);

  color: var(--color-blue300);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: var(--color-black);
  }
`;

export const LoadMore = styled.div`
  text-align: center;
  margin: 2rem auto;
  width: fit-content;
  color: var(--color-gray500);
`;

export const LinkTitle = styled.a`
  text-decoration: none;

  h2 {
    color: var(--color-black);
    font-weight: 600;
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: start;
  padding: 0 0.5rem;

  > *:only-child {
    max-width: calc(2 * 280px + 1rem);
    justify-self: start;
    width: 100%;
  }
`;

export const CardBody = styled.div`
  padding: 0.5rem 1rem 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;

  > h2 {
    color: #2d241f;
    font-weight: 600;
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }
`;

export const CardFooter = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.25rem;
`;

export const Card = styled.div`
  position: relative;
  background-color: var(--color-white);
  border: 2px solid var(--color-black);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;

  img[data-id="image"] {
    height: 10rem;
    object-fit: cover;
    width: 100%;
    border-top-left-radius: 6px; // (8px - 2px)
    border-top-right-radius: 6px; //(8px - 2px)
  }

  p[data-id="type"],
  p[data-id="price"] {
    position: absolute;
    top: 2px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--color-white);
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
  }

  p[data-id="type"] {
    left: 2px;
    color: var(--color-black);
  }

  p[data-id="price"] {
    right: 2px;
    color: var(--color-black);
  }

  p[data-id="tags"] {
    margin: 0.25rem 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.25rem;
  }

  p[data-id="description"] {
    font-size: clamp(0.9rem, 0.8rem + 0.3vw, 1rem);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const FilterableTag = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--color-green)" : "var(--color-white)"};
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-black)" : "var(--color-gray600)"};
  border: 2px solid var(--color-black);
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;

  &:hover {
    color: var(--color-black);
    background-color: ${({ $isActive }) =>
      $isActive ? "var(--color-green300)" : "var(--color-white)"};
  }
`;

export const ClearFiltersButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: var(--color-red);
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background: var(--color-red200);
  }
`;

export const ResultsCount = styled.p`
  font-weight: 500;
`;

export const MapDrawerTrigger = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid var(--color-black);
  background: var(--color-white);
  color: var(--color-black);
  font-weight: 600;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  z-index: 40;

  ${forTabletOnly(css`
    display: inline-flex;
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
  `)}
`;

export const MapDrawerContent = styled.div`
  background: var(--color-white);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 0.75rem;
  height: 85vh;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MapDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const MapDrawerTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0;
`;

export const MapDrawerClose = styled.button`
  border: 2px solid var(--color-black);
  background: var(--color-white);
  color: var(--color-black);
  font-weight: 600;
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
`;

export const MapDrawerMapArea = styled.div`
  flex: 1;
  min-height: 0;
`;

// SLUG STYLES

export const PageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
`;
