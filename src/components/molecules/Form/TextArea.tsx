import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const StyledTextarea = styled.textarea<{ styles?: SerializedStyles }>`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 2rem;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.green};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  ${({ styles }) => styles}
`;

type TextAreaProps = {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  styles?: SerializedStyles;
  maxLen?: number;
  minLen?: number;
};

export const TextArea = ({
  id,
  placeholder,
  value,
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
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      styles={styles}
      maxLength={maxLen}
      minLength={minLen}
    />
  );
};
