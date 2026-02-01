import { FormContainer } from "@/components/form/Form.styled";
import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/TextInput";
import { SerializedStyles } from "@emotion/react";
import { ReactElement } from "react";

interface FormTextProps {
  id: string;
  name: string;
  value: string;
  label?: ReactElement;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  meta: {
    isValid: boolean;
    errors: Array<string | undefined>;
  };
  styles?: SerializedStyles;
}

export const FormText = ({
  id,
  name,
  label,
  value,
  placeholder,
  onBlur,
  onChange,
  onPaste,
  meta,
  styles,
}: FormTextProps) => {
  return (
    <FormContainer styles={styles}>
      {label ?? <Label id={id} text={name} />}
      <TextInput
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        onPaste={onPaste}
      />
      {!meta.isValid && <em>{meta.errors.filter(Boolean).join(",")}</em>}
    </FormContainer>
  );
};
