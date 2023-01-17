import useSWR from "swr";
import { Image, SimpleGrid, Text } from "@mantine/core";
import { getGithubContent } from "api/graphic-design";
import { GITHUB_CONTENT } from "utils/constants";
import { GraphicsProps } from "utils/github-types";

export const Github = () => {
  const { data } = useSWR<GraphicsProps[]>(GITHUB_CONTENT, getGithubContent);

  return (
    <section>
      <h2>Graphic Design</h2>

      <Text>Artwork created using Adobe Illustrator</Text>

      <SimpleGrid cols={6} style={{ margin: "1rem 0" }}>
        {data &&
          data.map((graphic) => (
            <div
              key={graphic.key}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Image radius="md" src={graphic.img} width={200} alt={`${graphic.name} image`} />
              <Text> {graphic.name} </Text>
            </div>
          ))}
      </SimpleGrid>
    </section>
  );
};
