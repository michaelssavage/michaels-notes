import { CheckIcon, XIcon } from "@/components/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Track = styled.button<{ $on: boolean }>`
  position: relative;
  width: 64px;
  height: 34px;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.25s ease;
  outline: none;

  ${({ $on }) =>
    $on
      ? css`
          background: #1d9e75;
        `
      : css`
          background: #e24b4a;
        `}

  &:focus-visible {
    box-shadow: 0 0 0 3px #b5d4f4;
  }
`;

const Thumb = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 4px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${({ $on }) =>
    $on
      ? css`
          left: 34px;
        `
      : css`
          left: 4px;
        `}
`;

export function Toggle({
  on,
  handleChange,
}: {
  on: boolean;
  handleChange: () => void;
}) {
  return (
    <Track
      $on={on}
      onClick={handleChange}
      aria-pressed={on}
      aria-label={on ? "Toggle on" : "Toggle off"}
    >
      <Thumb $on={on}>{on ? <CheckIcon /> : <XIcon />}</Thumb>
    </Track>
  );
}
