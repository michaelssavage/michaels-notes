import { Content, Separator, Wrapper } from "./Footer.styled";

export const Footer = () => {
	return (
		<Wrapper>
			<Content>
				<a href="mailto:michaelsavage940@gmail.com">
					michaelsavage940@gmail.com
				</a>
				<Separator>|</Separator>
				<a
					href="https://github.com/michaelssavage"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
			</Content>
		</Wrapper>
	);
};
