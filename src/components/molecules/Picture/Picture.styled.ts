import styled from "@emotion/styled";

interface ImageProps {
  ar?: string;
  fit?: "cover" | "contain";
}

export const NotFound = styled.img`
  background-color: var(--color-white);
  width: 120px;
  border-radius: 0.4rem;
`;

export const Wrapper = styled.figure`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  figcaption {
    font-size: 0.9rem;
    opacity: 0.8;
    background-color: var(--color-white);
    padding: 0 0.25rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
`;

export const ImageStyle = styled.img<ImageProps>`
  grid-area: 1 / 1;
  aspect-ratio: ${({ ar }) => ar};
  object-fit: ${({ fit }) => fit};
  width: 100%;
  height: 100%;
  max-height: inherit;
`;
