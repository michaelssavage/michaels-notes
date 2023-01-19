import useSWR from "swr";
import { Image, SimpleGrid, Text } from "@mantine/core";
import { XyzTransitionGroup } from "@animxyz/react";
import { TOP_TRACKS_ENDPOINT } from "utils/constants";
import { getTopTracks } from "api/spotify";
import { TopTracksProps } from "utils/spotify-types";
import { usePagination } from "hooks/use-pagination.hook";
import { Pagination } from "components/Pagination";

export const TopTracks = () => {
  const { data } = useSWR<TopTracksProps[]>(TOP_TRACKS_ENDPOINT, getTopTracks);

  const { page, setPage, rowsPerPage, setRowsPerPage, handlePageChange, total } =
    usePagination(data);

  return (
    <section>
      <XyzTransitionGroup
        appearVisible
        xyz="fade up in-left in-rotate-left out-right out-rotate-right"
      >
        <Pagination
          handlePageChange={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          total={total || 0}
        />
        <SimpleGrid cols={5} style={{ margin: "1rem 0" }}>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((track: TopTracksProps) => (
              <div
                key={track.songUrl}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Image
                  radius="md"
                  src={track.albumImageUrl}
                  alt={`${track.title} album art`}
                  width={200}
                />
                <Text style={{ marginTop: "1rem" }}>
                  {track.artist} - {track.title}
                </Text>
              </div>
            ))}
        </SimpleGrid>
      </XyzTransitionGroup>
    </section>
  );
};
