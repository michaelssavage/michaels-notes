import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

interface TextInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: SerializedStyles;
}

const StyledInput = styled.input<{ styles?: SerializedStyles }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.gray400};
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
`;

export const TextInput = ({
  id,
  placeholder,
  value,
  onChange,
  styles,
}: TextInputProps) => {
  return (
    <StyledInput
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      styles={styles}
    />
  );
};
