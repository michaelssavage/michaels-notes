import styled from "@emotion/styled";
import { type ChangeEvent, useCallback, useRef } from "react";

const StyledSlider = styled.input`
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #dddddd;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #333333;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #333333;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
};

export const Slider = ({
  value,
  onChange,
  min,
  max,
  step = 1,
}: SliderProps) => {
  const frameRef = useRef<number | null>(null);

  const throttledOnChange = useCallback(
    (newValue: number) => {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        onChange(newValue);
        frameRef.current = null;
      });
    },
    [onChange]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      throttledOnChange(newValue);
    },
    [throttledOnChange]
  );

  return (
    <StyledSlider
      type="range"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
    />
  );
};
