import { useState } from "react";
import { GraphicsProps } from "utils/github-types";
import { TopTracksProps } from "utils/spotify-types";

type T = GraphicsProps[] | TopTracksProps[];

export const usePagination = (data?: T) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const total = data?.length;

  const handlePageChange = (pageNum: number) => {
    setPage(page + pageNum);
  };

  return { page, setPage, rowsPerPage, setRowsPerPage, handlePageChange, total };
};
