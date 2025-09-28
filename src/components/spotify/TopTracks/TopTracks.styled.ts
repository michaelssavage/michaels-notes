import { getContrastYIQ } from "@/lib/colors";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const Card = styled(Link)`
  flex: 0 0 auto;
  background-color: ${({ color, theme }) => color || theme.white};
  color: ${({ color, theme }) => getContrastYIQ(color || theme.white)};
  border-radius: 0.4rem;
  padding: 0.7rem 1.4rem 0.7rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  text-decoration: none;

  svg {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

export const TrackName = styled.h4`
  font-weight: 500;
`;

export const ArtistName = styled.p`
  font-size: 0.8rem;
`;
