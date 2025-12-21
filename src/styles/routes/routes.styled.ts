import styled from "@emotion/styled";

export const MiscContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  margin: 2rem auto 0;
  max-width: 50rem;
  font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.3rem);
`;

export const GridLineContainer = styled.div`
  // TODO: add display: grid-lanes when supported
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

  figure {
    max-width: 250px;
    transition: transform 0.2s ease;

    :hover {
      transform: scale(1.05);
    }
  }
`;
