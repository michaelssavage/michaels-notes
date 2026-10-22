import styled from "@emotion/styled";

export const DrawerContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 85vh;
  padding: 1rem;
  background: var(--color-white);
  color: var(--color-black);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  h2 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

export const IconButton = styled.button`
  display: grid;
  place-items: center;
  padding: 0.25rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--color-black);
  cursor: pointer;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: var(--color-gray300);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const TableArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
`;

export const MoviesTable = styled.table`
  width: 100%;
  min-width: 56rem;
  border-collapse: collapse;
  font-size: 0.9rem;

  th {
    position: sticky;
    top: 0;
    padding: 0.5rem;
    background: var(--color-white);
    border-bottom: 2px solid var(--color-gray400);
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 0.25rem;
    border-bottom: 1px solid var(--color-gray300);
    vertical-align: middle;
  }

  td:first-of-type {
    padding: 0.25rem 0.5rem;
    color: var(--color-gray600);
  }

  input {
    min-width: 6rem;
  }
`;
