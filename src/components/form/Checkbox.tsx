import styled from "@emotion/styled";

const CheckboxStyled = styled.div`
  padding: 3px 15px;

  label {
    display: inline-block;
    position: relative;
    padding-left: 1.5rem;
    cursor: pointer;
    user-select: none;
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: var(--color-green);
    }
  }

  input[type="checkbox"]:checked ~ span::after {
    opacity: 1;
  }

  label:hover input[type="checkbox"] ~ span {
    background-color: var(--color-white100);
  }

  label:hover input[type="checkbox"]:checked ~ span {
    background-color: var(--color-green);
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: var(--color-white100);
    border: 1px solid var(--color-gray400);
    border-radius: 4px;

    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 10px;
      border: 1px solid var(--color-white);
      border-width: 0 2px 2px 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
  }

  div {
    color: var(--color-black);
    line-height: 1.4;
    font-size: 1rem;
  }
`;

interface Props {
  onChange: () => void;
  checked: boolean;
  text: string;
  id: string;
}

export const Checkbox = ({ onChange, checked, text, id }: Props) => {
  return (
    <CheckboxStyled>
      <label htmlFor={id}>
        <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        <span />
        <div>{text}</div>
      </label>
    </CheckboxStyled>
  );
};
