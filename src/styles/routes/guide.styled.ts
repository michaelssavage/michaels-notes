import styled from "@emotion/styled";

export const BasicLink = styled.a`
  color: ${({ theme }) => theme.green300};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  flex-wrap: wrap;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.green200};
  }
`;

export const LoadMore = styled.div`
  text-align: center;
  margin: 2rem 0;
  width: fit-content;
  color: ${({ theme }) => theme.gray500};
`;

export const LinkTitle = styled.a`
  text-decoration: none;

  h2 {
    color: ${({ theme }) => theme.black};
    font-weight: 600;
    font-size: clamp(1rem, 0.9rem + 0.4vw, 1.2rem);
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: start;

  > *:only-child {
    max-width: calc(2 * 280px + 1rem);
    justify-self: start;
    width: 100%;
  }
`;

export const CardBody = styled.div`
  padding: 0.5rem 1rem 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const CardFooter = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.25rem;
`;

export const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.white};
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;

  img[data-id="image"] {
    height: 10rem;
    object-fit: cover;
    width: 100%;
    border-top-left-radius: 6px; // (8px - 2px)
    border-top-right-radius: 6px; //(8px - 2px)
  }

  p[data-id="type"],
  p[data-id="price"] {
    position: absolute;
    top: 2px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: ${({ theme }) => theme.white};
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
  }

  p[data-id="type"] {
    left: 2px;
    color: ${({ theme }) => theme.black};
  }

  p[data-id="price"] {
    right: 2px;
    color: ${({ theme }) => theme.black};
  }

  p[data-id="tags"] {
    margin: 0.25rem 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.25rem;
  }

  p[data-id="description"] {
    font-size: clamp(0.9rem, 0.8rem + 0.3vw, 1rem);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const FilterableTag = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.green : theme.white};
  color: ${({ $isActive, theme }) => ($isActive ? theme.black : theme.gray600)};
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;

  &:hover {
    color: ${({ theme }) => theme.black};
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.green300 : theme.white};
  }
`;

export const ClearFiltersButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.red};
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.red200};
  }
`;

export const ResultsCount = styled.p`
  font-weight: 500;
`;
