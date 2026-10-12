import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const WebsitesList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SelectsItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  ${forPhoneOnly(css`
    grid-template-columns: 1.5fr 1fr;
  `)}
`;

export const IdeasGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0 0 2rem;
  list-style: none;
`;

export const IdeaCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px solid var(--color-black);
  border-radius: 8px;
  text-decoration: none;
  color: var(--color-black);
  background-color: var(--color-white);

  &:hover {
    img {
      transform: scale(1.05);
    }
  }

  h3 {
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 4px;
    transition: transform 0.15s ease-in-out;
  }

  p {
    margin: 0;
  }
`;

export const IdeaImage = styled.div`
  position: relative;
  overflow: hidden;

  span {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

export const IdeaCategory = styled.span<{ color?: string }>`
  color: var(--color-gray300);
  font-size: 0.8rem;
  font-weight: 700;
`;

export const IdeaPrice = styled.span`
  align-self: flex-start;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  background-color: var(--color-black);
  color: var(--color-white);
  font-weight: 700;
  font-size: 0.875rem;
`;
