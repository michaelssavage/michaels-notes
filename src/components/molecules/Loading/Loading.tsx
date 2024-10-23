import { Container, Dot } from "./Loading.styled";

export const Loading = () => {
	return (
		<Container>
			<div>
				{[0, 1, 2].map((index) => (
					<Dot key={index} delay={index * 0.15} />
				))}
			</div>
		</Container>
	);
};
