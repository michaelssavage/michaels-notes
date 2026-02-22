import styled from "@emotion/styled";

const Container = styled.div`
  padding-top: var(--header-height, 0px);
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
