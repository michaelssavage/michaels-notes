import { Board } from "@/components/atoms/Board";
import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { FillInTheBlank } from "@/components/molecules/FillTheBlank/FillTheBlank";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { createFileRoute } from "@tanstack/react-router";

const title = "Playground | Michael Savage";
const description =
  "A space for experimentation and exploration of development ideas.";
const url = "https://michaelsavage.com/playground";

export const Route = createFileRoute("/playground")({
  component: Playground,
  head: () => ({
    link: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { property: "og:title", content: title },
      { property: "og:url", content: url },
      { name: "description", content: description },
      { property: "og:description", content: description },
    ],
  }),
});

function Playground() {
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

        <FillInTheBlank
          beforeText="¿Tú"
          afterText="(hacer) el check-in en línea ayer?"
          correctAnswer="hiciste"
        />
      </Panel>
    </Page>
  );
}
