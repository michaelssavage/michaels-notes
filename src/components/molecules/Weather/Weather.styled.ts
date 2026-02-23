import styled from "@emotion/styled";

export const SpeechBubble = styled.div`
  position: relative;
  color: var(--color-black);
  background-color: var(--color-yellow300);
  padding: 1rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: 600;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    color: var(--color-black);
    background-color: var(--color-yellow300);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }

  img {
    height: 1.2rem;
    width: 1.2rem;
  }
`;
