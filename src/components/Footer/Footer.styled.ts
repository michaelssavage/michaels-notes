import styled from "@emotion/styled";

export const Wrapper = styled.footer`
  width: 100%;
  padding: 0.25rem 1rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Separator = styled.span`
  margin: 0 0.5rem;
`;
