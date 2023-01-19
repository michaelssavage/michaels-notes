/*
 * Copyright (c) Jaguar Land Rover Ltd 2022. All rights reserved
 */

import { Button } from "@mantine/core";
import { useState } from "react";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons";
import { Row } from "components/Layout";

interface PaginationProps {
  handlePageChange: (page: number) => void;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (row: number) => void;
  total: number;
}

export const Pagination = (props: PaginationProps) => {
  const { handlePageChange, page, rowsPerPage, setPage, setRowsPerPage, total } = props;
  const [showingAll, setShowingAll] = useState(false);

  const handleShowAll = () => {
    if (showingAll) {
      setRowsPerPage(10);
      setShowingAll(false);
    } else {
      setRowsPerPage(total);
      setShowingAll(true);
    }
    setPage(0);
  };
  return (
    <nav style={{ marginTop: "1rem" }}>
      <Row justify="center">
        <IconChevronsLeft
          style={page <= 0 ? { color: "gray" } : { cursor: "pointer" }}
          size={40}
          onClick={() => setPage(0)}
        />

        <Button color="teal" radius="md" size="md" onClick={() => handleShowAll()}>
          Show {showingAll ? "Less" : "All"}
        </Button>

        <Button
          variant="default"
          radius="md"
          size="md"
          disabled={page <= 0}
          onClick={() => handlePageChange(-1)}
        >
          Previous
        </Button>

        <Button
          variant="default"
          radius="md"
          size="md"
          disabled={page * rowsPerPage + rowsPerPage >= total || rowsPerPage === total}
          onClick={() => handlePageChange(1)}
        >
          Next
        </Button>

        <IconChevronsRight
          style={
            page * rowsPerPage + rowsPerPage >= total || rowsPerPage === total
              ? { color: "gray" }
              : { cursor: "pointer" }
          }
          size={40}
          onClick={() => setPage(total / (page * rowsPerPage + rowsPerPage) - 1)}
        />
      </Row>
    </nav>
  );
};
