import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 5rem;
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
