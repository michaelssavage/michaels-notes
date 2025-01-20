import { Picture } from "@/components/molecules/Picture";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
	component: Playground,
});

import plantbassd from "src/assets/images/blog/plantbassd.png";

function Playground() {
	return (
		<div style={{ maxWidth: "500px", margin: "0 auto" }}>
			<h1>playground</h1>
			<Picture src={plantbassd} alt="" caption="Hello" />
		</div>
	);
}
