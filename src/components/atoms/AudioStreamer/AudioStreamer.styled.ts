import styled from "@emotion/styled";

export const MixCard = styled.div`
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background: var(--color-white);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    margin: 0 0.5rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    margin: 0 0.25rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
`;

export const MixDate = styled.p`
  color: var(--color-gray400);
  font-size: 0.75rem;
`;

export const Time = styled.div`
  color: var(--color-gray400);
  font-size: 0.875rem;
  font-family: monospace;
  white-space: nowrap;
`;

export const Description = styled.p`
  color: var(--color-black);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;
