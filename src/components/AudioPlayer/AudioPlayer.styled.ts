import styled from "@emotion/styled";

export const Player = styled.div`
  width: 120px;
  position: relative;

  button {
    background: none;
    border: none;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: ${({ theme }) => theme.colors.moon};
    display: grid;
    place-items: center;
    svg {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`;
