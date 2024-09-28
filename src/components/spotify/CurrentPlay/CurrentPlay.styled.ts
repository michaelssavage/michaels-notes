import { getContrastYIQ } from "@/lib/colors";
import styled from "@emotion/styled";

export const Comp = styled.div`
  margin: 0 3rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const NowPlaying = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;
  background-color: ${({ color }) => color || "#f0f0f0"};
  color: ${({ color }) => getContrastYIQ(color || "#f0f0f0")};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
`;
