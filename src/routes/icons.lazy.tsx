import { Group } from "@/components/atoms/Group";
import * as Icons from "@/components/icons";
import styled from "@emotion/styled";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/icons")({
	component: IconsPage,
});

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 1rem;
  border-radius: 8px;
  width: 185px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function IconsPage() {
	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto 3rem",
			}}
		>
			<h1>Icons in use</h1>
			<div
				style={{
					height: "90vh",
				}}
			>
				<Group direction="row" gap="20px" wrap="wrap">
					{(Object.keys(Icons) as Array<keyof typeof Icons>).map(
						(componentName) => {
							const Component = Icons[componentName];
							return (
								<Box key={componentName}>
									<p>{componentName}</p>
									<Component onClick={() => {}} color="#000000" />
								</Box>
							);
						},
					)}
				</Group>
			</div>
		</div>
	);
}
