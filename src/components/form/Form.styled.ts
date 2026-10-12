import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const FormContainer = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  ${({ styles }) => styles}
`;

export const MoreCount = styled.span`
  flex-shrink: 0;
  margin-left: 0.25rem;
  color: var(--color-gray600);
  white-space: nowrap;
`;
