import { Picture } from "@/components/molecules/Picture";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { GridLineContainer } from "@/styles/routes/routes.styled";
import { createFileRoute } from "@tanstack/react-router";

const title = "Doodles | Michael Savage";
const description =
  "Collection of doodles and sketches, tattoo ideas, and bad jokes.";
const url = "https://michaelsavage.com/doodles";

export const Route = createFileRoute("/doodles")({
  component: RouteComponent,
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

const doodles = import.meta.glob(
  "/src/content/doodles/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, as: "url" },
);

function RouteComponent() {
  return (
    <Page>
      <Panel>
        <h1>Doodles</h1>
      </Panel>

      <GridLineContainer>
        {Object.entries(doodles).map(([path, src]) => (
          <Picture
            key={path}
            src={src}
            alt={path.split("/").pop()?.replace(/\..+$/, "") || ""}
            fit="contain"
          />
        ))}
      </GridLineContainer>
    </Page>
  );
}
