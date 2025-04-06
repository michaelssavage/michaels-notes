import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
	beforeLoad: () => {
		return redirect({
			to: "/",
		});
	},
});
