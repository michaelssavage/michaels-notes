import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: () => Playground,
});

const Playground = () => {
  return (
    <div>
      <h1>playground</h1>
    </div>
  );
};
