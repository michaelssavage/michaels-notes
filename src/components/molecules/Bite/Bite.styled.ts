import styled from "@emotion/styled";

export const Year = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  transform: rotate(90deg);
  margin-right: -1rem;
  color: var(--color-yellow300);
`;

export const Text = styled.div`
  position: relative;
  list-style-type: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  width: 100%;
  background-color: var(--color-white);
  transition: 0.3s ease-in-out;
  box-shadow: var(--color-blue) 5px 5px;

  p[data-id="date"] {
    font-style: italic;
    color: var(--color-gray500);
    font-size: clamp(0.9rem, 0.7rem + 0.3vw, 1rem);
  }
`;

export const BiteItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.25rem 0;

  &:hover {
    ${Year} {
      transform: rotate(0deg);
      margin-right: 0;
      margin-left: 0.5rem;
    }
    ${Text} {
      box-shadow: var(--color-blue200) 5px 5px;
    }
  }
`;
