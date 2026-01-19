import { type MyTheme } from "@/styles/abstracts/colors.styled";
import { CSSObjectWithLabel, StylesConfig } from "react-select";

interface TypeOption {
  value: string;
  label: string;
}

export const customSelectStyles = (
  theme: MyTheme,
): StylesConfig<TypeOption, false> => ({
  control: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    borderRadius: "0.5rem",
    minHeight: "auto",
    minWidth: "150px",
    border: `2px solid ${state.isFocused ? theme.green : theme.black}`,
    color: theme.gray600,
    backgroundColor: theme.white,
    cursor: "pointer",
    boxShadow: "none",
    "&:hover": {
      border: `2px solid ${state.isFocused ? theme.green : theme.black}`,
    },
  }),
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme.green300
      : state.isFocused
        ? theme.gray
        : theme.white,
    color: state.isSelected ? theme.white : theme.black,
    padding: "0.5rem 1rem",
    cursor: "pointer",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: `2px solid ${theme.black}`,
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: theme.gray600,
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: theme.gray600,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
});
