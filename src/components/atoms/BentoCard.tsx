import { forBreakAt, forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const BentoHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

export const BentoTitle = styled.h3`
  font-size: 2.1rem;
  font-weight: 600;
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.26, 0.46, 0.44, 0.94);

  &:hover {
    text-decoration: underline;
  }

  ${forBreakAt({
    breakpoint: 900,
    styles: css`
      font-size: 2.1rem;
    `,
  })}
`;

export const BentoDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0.25rem 0 0;
`;

export const BentoContent = styled.div`
  flex: 1;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.card};
`;

type BentoCardProps = {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  to?: string;
};

type BentoCardStyling = Pick<BentoCardProps, "colSpan" | "rowSpan">;

const BentoCardStyled = styled(Link)<BentoCardStyling>`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.bentoBorder};
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  box-shadow: #009a7b66 5px 5px;

  &:hover {
    box-shadow: #009a7be5 5px 5px;

    ${BentoTitle} {
      transform: scale(1.04);
    }
  }

  ${({ colSpan }) => colSpan && `grid-column: span ${colSpan};`}
  ${({ rowSpan }) => rowSpan && `grid-row: span ${rowSpan};`}
  

  ${forTabletOnly(css`
    grid-column: 1 / -1;
  `)}
`;

export const BentoCard = ({
  children,
  colSpan,
  rowSpan,
  to,
}: BentoCardProps) => {
  return (
    <BentoCardStyled to={to} colSpan={colSpan} rowSpan={rowSpan}>
      {children}
    </BentoCardStyled>
  );
};
