import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { forTabletOnly } from "@/styles/abstracts/mixins.styled";

export const Sorter = styled.button`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.button};
    opacity: 0.8;
  }
`;

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.bentoBorder};

  ${({ theme }) =>
    forTabletOnly(css`
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      /* Custom scrollbar for webkit browsers */
      &::-webkit-scrollbar {
        height: 8px;
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.darkenBackground};
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.icon};
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.button};
      }

      /* Add fade effect at edges to indicate scroll */
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        pointer-events: none;
        z-index: 5;
      }

      &::before {
        left: 0;
        background: linear-gradient(90deg, ${theme.colors.card}, transparent);
      }

      &::after {
        right: 0;
        background: linear-gradient(270deg, ${theme.colors.card}, transparent);
      }
    `)}
`;

export const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
  background: ${({ theme }) => theme.colors.card};

  ${forTabletOnly(css`
    min-width: 600px;
    width: max-content;
  `)}
`;

export const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.button};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TableBody = styled.tbody`
  position: relative;
`;

export const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background: ${({ theme }) => theme.colors.card};
  }

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHead = styled.th`
  padding: 18px 24px;
  text-align: left;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.weather};

  ${forTabletOnly(css`
    min-width: 140px;
    padding: 14px 18px;
    font-size: 0.8rem;
  `)}
`;

export const TableCell = styled.td`
  padding: 18px 24px;
  vertical-align: top;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  position: relative;
`;
