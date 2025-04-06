import styled from "@emotion/styled";

interface CarouselTrackProps {
	x: number;
	isPaused: boolean;
}

export const CarouselContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
  height: fit-content;
`;

export const CarouselTrack = styled.div<CarouselTrackProps>`
  display: flex;
  transform: translateX(${({ x }) => x}px);
  transition: ${({ isPaused }) => (isPaused ? "transform 0.2s" : "none")};
  padding-bottom: 1rem;
`;
