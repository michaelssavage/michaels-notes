type Props = {
	onClick?: () => void;
};

export const RightIcon = ({ onClick }: Props) => {
	return (
		<svg
			onClick={onClick}
			onKeyDown={onClick}
			role="img"
			aria-label="right icon"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 6l6 6l-6 6" />
		</svg>
	);
};
