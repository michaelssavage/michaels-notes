import { CSSObjectWithLabel, StylesConfig } from "react-select";

export const customSelectStyles = <
  Option,
  IsMulti extends boolean = false,
>(): StylesConfig<Option, IsMulti> => ({
  control: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    borderRadius: "0.5rem",
    minHeight: "auto",
    minWidth: "150px",
    border: `2px solid ${state.isFocused ? "var(--color-green)" : "var(--color-black)"}`,
    color: "var(--color-gray600)",
    backgroundColor: "var(--color-white)",
    cursor: "pointer",
    boxShadow: "none",
    "&:hover": {
      border: `2px solid ${state.isFocused ? "var(--color-green)" : "var(--color-black)"}`,
    },
  }),
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--color-green300)"
      : state.isFocused
        ? "var(--color-gray)"
        : "var(--color-white)",
    color: state.isSelected ? "var(--color-white)" : "var(--color-black)",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: `2px solid var(--color-black)`,
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "var(--color-gray600)",
  }),
  multiValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "var(--color-white)",
    borderRadius: "0.3rem",
    backgroundColor: "var(--color-green200)",
    "> div": {
      color: "var(--color-white)",
    },
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "var(--color-gray600)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
});
