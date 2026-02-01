import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const FormContainer = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  ${({ styles }) => styles}
`;
