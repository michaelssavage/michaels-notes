import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface Props {
  title: string;
  text?: string;
  children?: ReactNode;
}

const BoardStyle = styled.div`
  margin: 1em 0;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.blue};
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 5px;
  padding: 1em;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.5);
`;

export const Board = ({ title, text, children }: Props) => {
  return (
    <BoardStyle>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {children}
    </BoardStyle>
  );
};
