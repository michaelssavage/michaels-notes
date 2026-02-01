import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

interface TextInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
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
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  onPaste,
  styles,
}: TextInputProps) => {
  return (
    <StyledInput
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onPaste={onPaste}
      styles={styles}
    />
  );
};
