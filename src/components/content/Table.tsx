import styled from "@emotion/styled";

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid var(--color-black);
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableContainer>
      <TableStyled>{children}</TableStyled>
    </TableContainer>
  );
};

const THeadStyled = styled.thead`
  background-color: var(--color-black);
  color: var(--color-white);
  text-align: left;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  th {
    padding: 8px 12px;
  }

  th:first-child {
    border-top-left-radius: 8px;
  }

  th:last-child {
    border-top-right-radius: 8px;
  }
`;

export const Thead = ({ children }: { children: React.ReactNode }) => {
  return <THeadStyled>{children}</THeadStyled>;
};

export const Tbody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

const TrStyled = styled.tr`
  border-bottom: 1px solid var(--color-gray500);

  &:last-child {
    border-bottom: none;
  }
`;

export const Tr = ({ children }: { children: React.ReactNode }) => {
  return <TrStyled>{children}</TrStyled>;
};

export const Th = ({ children }: { children: React.ReactNode }) => {
  return <th>{children}</th>;
};

const TdStyled = styled.td`
  padding: 8px 12px;
  background-color: var(--color-white);
  border-right: 1px solid var(--color-gray600);

  &:last-child {
    border-right: none;
  }
`;

export const Td = ({ children }: { children: React.ReactNode }) => {
  return <TdStyled>{children}</TdStyled>;
};
