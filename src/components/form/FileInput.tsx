import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

interface FileInputProps {
  id: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple: boolean;
  accept?: string;
  styles?: SerializedStyles;
}

const StyledFileInput = styled.input<{ styles?: SerializedStyles }>`
  width: 100%;
  padding: 3px 6px;
  border: 1px solid ${({ theme }) => theme.gray400};
  background-color: ${({ theme }) => theme.white};
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;

  &::file-selector-button {
    padding: 4px 12px;
    margin-right: 12px;
    border: 1px solid ${({ theme }) => theme.gray400};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.white};
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.gray};
    }
  }

  ${({ styles }) => styles}
`;

export const FileInput = ({
  id,
  ref,
  onChange,
  multiple = true,
  accept = "image/*",
  styles,
}: FileInputProps) => {
  return (
    <StyledFileInput
      type="file"
      id={id}
      ref={ref}
      onChange={onChange}
      multiple={multiple}
      accept={accept}
      styles={styles}
    />
  );
};
