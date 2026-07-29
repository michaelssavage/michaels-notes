import { forTabletOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 5rem;

  ${forTabletOnly(css`
    margin-top: 8rem;
  `)}
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
