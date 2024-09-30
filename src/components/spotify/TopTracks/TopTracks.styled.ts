import { getContrastYIQ } from "@/lib/colors";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

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

export const Title = styled.h3`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  margin: 0 -3rem;
  color: ${({ theme }) => theme.colors.secondaryText};

  svg {
    color: ${({ theme }) => theme.colors.extBtnBg};
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 70%;
  transform: translateY(-70%);
  background-color: ${({ theme }) => theme.colors.secondaryText};
  color: ${({ theme }) => theme.colors.secondaryText};
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

export const LeftScrollButton = styled(ScrollButton)`
  left: calc(-10px - 1.5rem);
`;

export const RightScrollButton = styled(ScrollButton)`
  right: calc(-10px - 1.5rem);
`;

export const ComponentWrapper = styled.div`
  position: relative;
  margin: 0 3rem;
`;
