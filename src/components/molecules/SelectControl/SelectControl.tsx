import { ThumbPositioned } from "@/components/molecules/SelectControl/ThumbPositioned";
import { useState } from "react";
import { Segment, Track, Wrapper } from "./SelectControl.styled";

interface SelectControlProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: "short_term", label: "Last Month" },
  { value: "medium_term", label: "Last 6 Months" },
  { value: "long_term", label: "Last Year" },
];

export const SelectControl = ({
  value: controlledValue,
  onChange,
}: SelectControlProps) => {
  const [internal, setInternal] = useState("short_term");

  const value = controlledValue ?? internal;

  const handleChange = (v: string) => {
    setInternal(v);
    onChange(v);
  };

  const activeIdx = options.findIndex((o) => o.value === value);

  return (
    <Wrapper>
      <Track id="track">
        <ThumbPositioned activeIdx={activeIdx} />
        {options.map((opt) => (
          <Segment
            key={opt.value}
            $active={opt.value === value}
            onClick={() => handleChange(opt.value)}
          >
            {opt.label}
          </Segment>
        ))}
      </Track>
    </Wrapper>
  );
};
