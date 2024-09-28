import { forPhoneOnly } from "@/styles/abstracts/mixins.styled";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ToggleIcon = styled.label`
  position: fixed;
  bottom: 0;
  left: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 5;
  cursor: pointer;
  transition: 0.3s ease background-color;
  background-color: ${({ theme }) => theme.colors.toggle};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  svg {
    height: 80%;
    width: auto;
    position: relative;
  }

  svg[id="star"] {
    top: 25%;
    color: ${({ theme }) => theme.colors.sun};
    transition:
      0.3s ease top,
      0.3s ease left,
      0.3s ease transform,
      0.3s ease background-color;
  }

  svg[id="moon"] {
    bottom: 25%;
    fill: ${({ theme }) => theme.colors.moon};
    transition: 0.3s ease bottom;
  }

  ${forPhoneOnly(css`
    width: 2.8rem;
    height: 2.8rem;
  `)}
`;

export const ToggleInput = styled.input`
  display: none;

  &:not(:checked) ~ svg[id="moon"] {
    bottom: -100%;
  }

  &:checked ~ svg[id="star"] {
    top: -100%;
  }

  &:checked ~ svg[id="moon"] {
    bottom: 25%;
  }
`;
