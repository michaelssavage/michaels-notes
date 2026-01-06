import styled from "@emotion/styled";
import { cloneElement, ReactElement } from "react";

interface FormProps {
  id: string;
  label: string;
  children: ReactElement;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    font-weight: 500;
    font-size: 0.875rem;
  }
`;

export const FormLabel = ({ id, label, children }: FormProps) => {
  return (
    <Container>
      <label>{label}</label>
      {cloneElement(children as ReactElement<{ id: string }>, { id })}
    </Container>
  );
};
