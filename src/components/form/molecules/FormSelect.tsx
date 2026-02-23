import { FormContainer } from "@/components/form/Form.styled";
import { Label } from "@/components/form/Label";
import { customSelectStyles } from "@/styles/react-select.styled";
import Select, { type MultiValue, type SingleValue } from "react-select";

interface FormSelectProps<T> {
  id: string;
  name: string;
  value: T | T[];
  options: Array<{ value: T; label: string }>;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (newValue: T | T[]) => void;
  meta: {
    isValid: boolean;
    errors: Array<string | undefined>;
  };
  multiSelect?: boolean;
}

export const FormSelect = <T,>({
  id,
  value,
  options,
  onBlur,
  onChange,
  placeholder,
  name,
  meta,
  multiSelect = false,
}: FormSelectProps<T>) => {
  const isMulti = Boolean(multiSelect);
  const selectedValue = isMulti
    ? options.filter((opt) => (value as T[]).includes(opt.value))
    : options.find((opt) => opt.value === value);

  const handleChange = (
    option:
      | MultiValue<{
          value: T;
          label: string;
        }>
      | SingleValue<{
          value: T;
          label: string;
        }>
  ) => {
    if (isMulti) {
      onChange(
        (option as Array<{ value: T; label: string }>).map((o) => o.value)
      );
    } else {
      onChange((option as { value: T; label: string })?.value);
    }
  };

  return (
    <FormContainer>
      <Label id={id} text={name} />
      <Select<{ value: T; label: string }, boolean>
        id={name}
        instanceId={id}
        name={name}
        value={selectedValue}
        options={options}
        placeholder={placeholder}
        onBlur={onBlur}
        isMulti={isMulti}
        onChange={handleChange}
        styles={customSelectStyles()}
      />
      {!meta.isValid && <em>{meta.errors.filter(Boolean).join(",")}</em>}
    </FormContainer>
  );
};
