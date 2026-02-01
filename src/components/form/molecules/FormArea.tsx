import { FormContainer } from "@/components/form/Form.styled";
import { Label } from "@/components/form/Label";
import { TextArea } from "@/components/form/TextArea";

interface FormAreaProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  meta: {
    isValid: boolean;
    errors: Array<string | undefined>;
  };
}
export const FormArea = ({
  id,
  name,
  value,
  placeholder,
  onBlur,
  onChange,
  meta,
}: FormAreaProps) => {
  return (
    <FormContainer>
      <Label id={id} text={name} />
      <TextArea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      />
      {!meta.isValid && <em>{meta.errors.filter(Boolean).join(",")}</em>}
    </FormContainer>
  );
};
