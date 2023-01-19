import useSWR from "swr";
import { Image, SimpleGrid, Text } from "@mantine/core";
import { XyzTransitionGroup } from "@animxyz/react";
import { getGithubContent } from "api/github";
import { GITHUB_CONTENT } from "utils/constants";
import { GraphicsProps } from "utils/github-types";
import { usePagination } from "hooks/use-pagination.hook";
import { Pagination } from "components/Pagination";

export const Github = () => {
  const { data } = useSWR<GraphicsProps[]>(GITHUB_CONTENT, getGithubContent);

  const { page, setPage, rowsPerPage, setRowsPerPage, handlePageChange, total } =
    usePagination(data);

  return (
    <section>
      <XyzTransitionGroup
        appearVisible
        xyz="fade up in-left in-rotate-left out-right out-rotate-right"
      >
        <SimpleGrid cols={5} style={{ margin: "1rem 0" }}>
          {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((graphic) => (
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
      <Pagination
        handlePageChange={handlePageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        total={total || 0}
      />
    </section>
  );
};
