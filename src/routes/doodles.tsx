import { Picture } from "@/components/molecules/Picture";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { masonryImgStyles } from "@/styles/routes/routes.styled";
import { createFileRoute } from "@tanstack/react-router";
import { Masonry } from "masonic";

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
  { eager: true, as: "url" }
);
const doodleEntries = Object.entries(doodles);

const MasonryImg = ({ data: [path, src] }: { data: [string, string] }) => (
  <Picture
    src={src}
    alt={path.split("/").pop()?.replace(/\..+$/, "") || ""}
    fit="contain"
    style={masonryImgStyles}
  />
);

function RouteComponent() {
  return (
    <Page>
      <Panel>
        <h1>Doodles</h1>
      </Panel>

      <Masonry
        items={doodleEntries}
        render={MasonryImg}
        columnGutter={8}
        columnWidth={250}
      />
    </Page>
  );
}
