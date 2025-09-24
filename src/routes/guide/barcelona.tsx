import { Group } from "@/components/atoms/Group";
import { Icon } from "@/components/atoms/Icon";
import { MetaData } from "@/components/atoms/MetaData";
import { MapIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { sortableHeader } from "@/components/molecules/Table/SortableHeader";
import { Table } from "@/components/molecules/Table/Table";
import { items } from "@/content/guide/barcelona";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { GuideTableItem } from "@/types/Guide";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/guide/barcelona")({
  component: RouteComponent,
});

const description =
  "Barcelona guide with places to visit, activities, and entertainment options.";

const columnHelper = createColumnHelper<GuideTableItem>();

function RouteComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: ({ column }) =>
          sortableHeader(column.id, "Title", sorting, setSorting),
        cell: (info) => {
          return (
            <Anchor
              variant="link"
              link={info.row.original.link}
              text={info.getValue()}
              isExternal
            />
          );
        },
      }),
      columnHelper.accessor("location", {
        header: () => <Group justify="center">Location</Group>,
        cell: (info) => {
          return (
            <Group justify="center">
              <Icon
                label=""
                icon={<MapIcon />}
                link={info.getValue()}
                isExternal
              />
            </Group>
          );
        },
      }),
      columnHelper.accessor("type", {
        header: ({ column }) =>
          sortableHeader(column.id, "Type", sorting, setSorting),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("tags", {
        header: "Tags",
        cell: (info) => {
          const tags = info.getValue();
          return tags && tags.length > 0 ? tags.join(", ") : "-";
        },
      }),
    ],
    [sorting]
  );

  const table = useReactTable({
    data: items,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Page>
      <MetaData
        title="Barcelona Guide | Michael Savage"
        description={description}
      />

      <Panel>
        <h1>Barcelona Guide</h1>
        <p>Qué haré o veré hoy?</p>
        <Table table={table} />
      </Panel>
    </Page>
  );
}
