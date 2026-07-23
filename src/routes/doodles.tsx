import { Picture } from "@/components/molecules/Picture";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
  LightboxImage,
  LightboxOverlay,
  masonryImgStyles,
} from "@/styles/routes/routes.styled";
import { createFileRoute } from "@tanstack/react-router";
import { Masonry } from "masonic";
import { useEffect, useState } from "react";

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
  { eager: true, query: "?url", import: "default" },
);
const doodleEntries = Object.entries(doodles) as [string, string][];

const MasonryImg = ({
  data: [path, src],
  onClick,
}: {
  data: [string, string];
  onClick: (src: string) => void;
}) => (
  <Picture
    src={src}
    alt={path.split("/").pop()?.replace(/\..+$/, "") || ""}
    fit="contain"
    style={masonryImgStyles}
    onClick={() => onClick(src)}
  />
);

function RouteComponent() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <Page>
      <Panel>
        <h1>Doodles</h1>
      </Panel>

      <Masonry
        items={doodleEntries}
        render={(props) => <MasonryImg {...props} onClick={setSelected} />}
        columnGutter={8}
        columnWidth={250}
      />

      {selected && (
        <LightboxOverlay onClick={() => setSelected(null)}>
          <LightboxImage src={selected} alt="" />
        </LightboxOverlay>
      )}
    </Page>
  );
}
