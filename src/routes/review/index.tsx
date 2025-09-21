import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/review/")({
  beforeLoad: () => {
    return redirect({ to: "/" });
  },
});
