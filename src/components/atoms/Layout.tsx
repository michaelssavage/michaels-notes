import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 2rem;

  ${forTabletOnly(css`
    padding-top: 80px;
  `)}
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
