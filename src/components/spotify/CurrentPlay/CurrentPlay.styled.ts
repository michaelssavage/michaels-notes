import styled from "@emotion/styled";

export const Comp = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const NowPlaying = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`;
