import styled from "@emotion/styled";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 70vh;
	width: 100%;
`;

export const NotFound = () => {
	return (
		<Container>
			<h1>404 Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</Container>
	);
};
