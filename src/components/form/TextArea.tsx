import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const StyledTextarea = styled.textarea<{ styles?: SerializedStyles }>`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 2rem;
  padding: 8px 12px;
  border: 1px solid var(--color-gray400);
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-green);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: var(--color-gray500);
    font-size: 0.9rem;
  }

  ${({ styles }) => styles}
`;

type TextAreaProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  styles?: SerializedStyles;
  maxLen?: number;
  minLen?: number;
};

export const TextArea = ({
  id,
  name,
  placeholder,
  value,
  onBlur,
  onChange,
  styles,
  maxLen,
  minLen,
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <StyledTextarea
      id={id}
      name={name}
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      styles={styles}
      maxLength={maxLen}
      minLength={minLen}
    />
  );
};
