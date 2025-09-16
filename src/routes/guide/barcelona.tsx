import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { MetaData } from "@/components/atoms/MetaData";
import { Anchor } from "@/components/molecules/Anchor";
import { sortableHeader } from "@/components/molecules/Table/SortableHeader";
import { Table } from "@/components/molecules/Table/Table";
import { items, type TableItem } from "@/content/guide/barcelona";
import { Page, Panel } from "@/styles/routes/blog.styled";

export const Route = createFileRoute("/guide/barcelona")({
	component: RouteComponent,
});

const description =
	"Barcelona guide with places to visit, activities, and entertainment options.";

const columnHelper = createColumnHelper<TableItem>();

function RouteComponent() {
	const [sorting, setSorting] = useState<SortingState>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("title", {
				header: ({ column }) =>
					sortableHeader(column.id, "Title", sorting, setSorting),
				cell: (info) => {
					const value = info.getValue();
					const link = info.row.original.link;
					return link ? (
						<Anchor variant="link" link={link} text={value} isExternal />
					) : (
						value
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
			columnHelper.accessor("location", {
				header: "Location",
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
		[sorting],
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
			<MetaData title="Barcelona Guide" description={description} />

			<Panel>
				<h1>Barcelona Guide</h1>
				<Table table={table} />
			</Panel>
		</Page>
	);
}
