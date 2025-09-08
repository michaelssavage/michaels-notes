export const ArrowUpIcon = ({ size = 24 }) => {
	return (
		<svg
			role="img"
			aria-label="arrow up icon"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 5l0 14" />
			<path d="M16 9l-4 -4" />
			<path d="M8 9l4 -4" />
		</svg>
	);
};
