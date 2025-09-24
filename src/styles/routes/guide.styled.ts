import styled from "@emotion/styled";

export const BasicLink = styled.a`
  color: ${({ theme }) => theme.colors.button};
  display: grid;
  place-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.buttonLink};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  p[data-id="type"] {
    position: absolute;
    top: -0.75rem;
    left: 0;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.highlight};
  }

  p[data-id="description"] {
    margin-bottom: 1rem;
  }

  p[data-id="tags"] {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.5rem;
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

export const TypeSelect = styled.select`
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 9999px;
  min-width: 150px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.card};
  cursor: pointer;

  &:focus {
    outline: solid 2px ${({ theme }) => theme.colors.mint};
  }

  /* Style the dropdown arrow */
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
`;

export const FilterableTag = styled.button<{ isActive: boolean }>`
  transition: all 0.2s ease;
  background: ${(props) => (props.isActive ? "#007bff" : "#a1c9f0")};
  color: ${(props) => (props.isActive ? "white" : "#3e4449")};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;

  &:hover {
    background: ${(props) => (props.isActive ? "#0056b3" : "#dee2e6")};
  }
`;

export const ClearFiltersButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;

  &:hover {
    background: #c82333;
  }
`;

export const ResultsCount = styled.p`
  margin: 0.75rem 0;
  font-weight: 500;
`;
