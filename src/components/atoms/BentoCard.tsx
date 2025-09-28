import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
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
  font-weight: 600;
  width: fit-content;
  color: ${({ theme }) => theme.black};
  will-change: transform;
  transition: transform 0.2s cubic-bezier(0.26, 0.46, 0.44, 0.94);
`;

export const BentoDescription = styled.p`
  color: ${({ theme }) => theme.black};
  margin: 0.25rem 0 0;
`;

export const BentoContent = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.white};
`;

type BentoCardProps = {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  to?: string;
};

type BentoCardStyling = Pick<BentoCardProps, "colSpan" | "rowSpan">;

const BentoCardStyled = styled(Link)<BentoCardStyling>`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  box-shadow: ${({ theme }) => theme.blue} 5px 5px;

  &:hover {
    box-shadow: ${({ theme }) => theme.blue200} 5px 5px;

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
