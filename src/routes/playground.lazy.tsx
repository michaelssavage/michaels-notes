import { createLazyFileRoute } from "@tanstack/react-router";
import { Board } from "@/components/atoms/Board";
import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";

export const Route = createLazyFileRoute("/playground")({
	component: Playground,
});

function Playground() {
	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto 3rem",
			}}
		>
			<h1>playground</h1>
			<div
				style={{
					height: "90vh",
					background: "#f1c9c9",
				}}
			>
				<Group direction="column" gap="1rem">
					<Board
						title="Distributed"
						text="Multiple independent processes with no shared memory, communicating only via message passing."
					/>
				</Group>
				<Anchor
					link="/blog/what-is-plant-bassd"
					text="Blog - What is Plant Bass'd?"
					variant="button"
				/>
			</div>
		</div>
	);
}
