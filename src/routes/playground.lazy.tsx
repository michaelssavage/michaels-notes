import { Board } from "@/components/atoms/Board";
import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useHead, useSeoMeta } from "@unhead/react";

export const Route = createLazyFileRoute("/playground")({
  component: Playground,
});

function Playground() {
  useHead({
    link: [
      { rel: "canonical", href: "https://www.michaelsavage.ie/playground" },
    ],
  });

  useSeoMeta({
    title: "Playground",
    description: "A space for experimentation and exploration.",
  });

  return (
    <Page>
      <Panel>
        <h1>playground</h1>
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
      </Panel>
    </Page>
  );
}
