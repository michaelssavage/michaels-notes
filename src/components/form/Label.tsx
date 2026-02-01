import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

interface LabelProps {
  id: string;
  text: string;
  styles?: SerializedStyles;
}

const LabelStyled = styled.label<{ styles?: SerializedStyles }>`
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;

  ${({ styles }) => styles}
`;

export const Label = ({ id, text, styles }: LabelProps) => {
  return (
    <LabelStyled htmlFor={id} styles={styles}>
      {text}
    </LabelStyled>
  );
};
