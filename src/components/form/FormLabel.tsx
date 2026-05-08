import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { cloneElement, ReactElement } from "react";

interface FormProps {
  id: string;
  label: string;
  children: ReactElement;
  styles?: SerializedStyles;
}

const Container = styled.div<{ css?: SerializedStyles }>`
  display: flex;
  flex-direction: column;

  > label {
    font-weight: 500;
    font-size: 0.875rem;
  }

  ${({ css }) => css}
`;

export const FormLabel = ({ id, label, children, styles }: FormProps) => {
  return (
    <Container css={styles}>
      <label htmlFor={id}>{label}</label>
      {cloneElement(children as ReactElement<{ id: string }>, { id })}
    </Container>
  );
};
