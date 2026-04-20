import styled from "@emotion/styled";

export const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Navigation = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--color-black);
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
    border-radius: 10px;
  }

  #scroll-left {
    padding: 0.25rem 1rem 0.25rem 0.5rem;
  }
  #scroll-right {
    padding: 0.25rem 0.5rem 0.25rem 1rem;
  }

  svg[aria-label="left icon"],
  svg[aria-label="right icon"] {
    width: 1.25rem;
    height: 1.25rem;

    &:focus {
      outline: none;
    }
  }

  svg[aria-label="left icon"] {
    left: calc(-1rem);
  }
  svg[aria-label="right icon"] {
    right: calc(-1rem);
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.6rem 0;
`;
