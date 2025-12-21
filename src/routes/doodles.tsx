import { Picture } from "@/components/molecules/Picture";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { GridLineContainer } from "@/styles/routes/routes.styled";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/doodles")({
  component: RouteComponent,
});

const doodles = import.meta.glob(
  "/src/content/doodles/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, as: "url" }
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
