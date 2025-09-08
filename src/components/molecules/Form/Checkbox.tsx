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

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: ${({ theme }) => theme.colors.mint};
    }
  }


  input[type='checkbox']:checked ~ span::after {
    opacity: 1;
  }

  label:hover input[type='checkbox'] ~ span {
    background-color: #eee;
  }

  label:hover input[type='checkbox']:checked ~ span {
    background-color: ${({ theme }) => theme.colors.mint};
  }

  span {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    transition: background-color 0.25s ease;
    border-radius: 4px;

    &::after {
      content: '';
      position: absolute;
      left: 8px;
      top: 4px;
      width: 5px;
      height: 10px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
  }

  div {
    color: #333444;
    text-decoration: underline;
    line-height: 1.4;
    font-size: 1rem;
  }
`;
interface Props {
	onChange: () => void;
	value: boolean;
	text: string;
	id: string;
}

export const Checkbox = ({ onChange, value, text, id }: Props) => {
	return (
		<CheckboxStyled onChange={onChange}>
			<label htmlFor={id}>
				<input type="checkbox" id={id} checked={value} />
				<span />
				<div>{text}</div>
			</label>
		</CheckboxStyled>
	);
};
