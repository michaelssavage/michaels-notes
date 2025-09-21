import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/guide/")({
  beforeLoad: () => {
    return redirect({
      to: "/guide/barcelona",
    });
  },
});
