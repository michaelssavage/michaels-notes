import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useLocation } from "@tanstack/react-router";

const ROUTES_WITHOUT_TOP_SPACING = ["/services"];

const Container = styled.div<{ $noTopSpacing: boolean }>`
  ${({ $noTopSpacing }) =>
    !$noTopSpacing &&
    css`
      margin-top: 5rem;

      ${forTabletOnly(css`
        margin-top: 6rem;
      `)}
    `}
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const noTopSpacing = ROUTES_WITHOUT_TOP_SPACING.includes(pathname);

  return <Container $noTopSpacing={noTopSpacing}>{children}</Container>;
};
