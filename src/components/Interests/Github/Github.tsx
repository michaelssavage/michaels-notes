import useSWR from "swr";
import { Image, SimpleGrid, Text } from "@mantine/core";
import { XyzTransitionGroup } from "@animxyz/react";
import { getGithubContent } from "api/github";
import { GITHUB_CONTENT } from "utils/constants";
import { GraphicsProps } from "utils/github-types";

export const Github = () => {
  const { data } = useSWR<GraphicsProps[]>(GITHUB_CONTENT, getGithubContent);

  return (
    <section>
      <XyzTransitionGroup
        appearVisible
        xyz="fade up in-left in-rotate-left out-right out-rotate-right"
      >
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
      </XyzTransitionGroup>
    </section>
  );
};
