import { SearchIcon } from "@/components/icons";
import type { SerializedStyles } from "@emotion/react";
import type { ChangeEvent, ReactElement } from "react";
import { Box, Panel } from "./SearchBox.styled";

interface ISearch {
  id: string;
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: ReactElement;
  styles?: SerializedStyles;
}

export const SearchBox = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon = <SearchIcon />,
  styles,
}: ISearch) => {
  return (
    <Panel styles={styles}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <Box>
        <input
          id={id}
          aria-label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="search"
        />
        {icon}
      </Box>
    </Panel>
  );
};
