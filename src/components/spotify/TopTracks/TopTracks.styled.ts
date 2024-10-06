import { getContrastYIQ } from "@/lib/colors";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 10px;
`;

export const Card = styled(Link)`
  flex: 0 0 auto;
  background-color: ${({ color }) => color || "#f0f0f0"};
  color: ${({ color }) => getContrastYIQ(color || "#f0f0f0")};
  border-radius: 0.4rem;
  padding: 0.7rem 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  text-decoration: none;

  svg {
    position: absolute;
    top: -8px;
    right: -8px;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

export const TrackName = styled.h3`
  font-size: 0.9rem;
`;

export const ArtistName = styled.p`
  font-size: 0.8rem;
`;
