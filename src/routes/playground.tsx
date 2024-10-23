import { Movies } from "@/components/atoms/Movies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
	component: Playground,
});

function Playground() {
	return (
		<div>
			<h1>playground</h1>
			<Movies />
		</div>
	);
}
