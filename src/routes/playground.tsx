import { Anchor } from "@/components/molecules/Anchor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
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
				<Anchor
					link="/blog/what-is-plant-bassd"
					text="Blog - What is Plant Bass'd?"
					variant="button"
				/>
			</div>
		</div>
	);
}
