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
import { Page, Panel } from "@/styles/routes/blog.styled";

export const Route = createFileRoute("/guide/barcelona")({
	component: RouteComponent,
});

const description =
	"Barcelona guide with places to visit, activities, and entertainment options.";

interface TableItem {
	title: string;
	link?: string;
	price?: string;
	location?: string;
	tags?: string[];
	type: string;
}

const items: TableItem[] = [
	{
		title: "Dr. Flow",
		location: "Born",
		link: "https://www.instagram.com/drflowbarcelona/",
		type: "Live Music",
	},
	{
		title: "Skydiving",
		price: "€300",
		link: "https://saltamos.es/en/tandem-jump/",
		type: "Sports & Activities",
	},
	{ title: "Biblioteca Gabriel García Márquez", type: "Points of Interest" },
	{
		title: "Observatori Fabra de Barcelona",
		tags: ["Free 1st Sunday"],
		type: "Points of Interest",
	},
	{ title: "Recinte Modernista de Sant Pau", type: "Points of Interest" },
	{
		title: "Caixaforum",
		price: "€6",
		tags: ["Contemporary art"],
		type: "Points of Interest",
	},
	{
		title: "Design Museum",
		tags: ["Free 1st Sunday"],
		type: "Points of Interest",
	},
	{ title: "Stereo 18", location: "Born", type: "Live Music" },
	{
		title: "Sala Upload",
		location: "Montjuic",
		link: "https://sala-upload.com/",
		type: "Live Music",
	},
	{
		title: "Sailing Experience BCN",
		link: "https://www.instagram.com/sailingexperiencebarcelona/",
		type: "Sports & Activities",
	},
	{ title: "White Rabbit Museum", price: "€25", type: "Points of Interest" },
	{
		title: "Aquarium",
		price: "€14",
		link: "https://tickets.aquariumbcn.com/?lang=es#",
		type: "Fun & Relaxing",
	},
	{ title: "Glories Building", price: "€18", type: "Points of Interest" },
	{ title: "Padel", location: "Playtomic app", type: "Sports & Activities" },
	{
		title: "Axe Throwing",
		price: "€20 per person",
		type: "Sports & Activities",
	},
	{ title: "Tibidabo Ice Rink", tags: ["Winter"], type: "Sports & Activities" },
	{
		title: "Barcelona Botanical Garden + La Caseta del Migdia",
		tags: ["Sunset"],
		type: "Points of Interest",
	},
	{ title: "Jazz at 23 Robadores", type: "Fun & Relaxing" },
	{ title: "Palau Martorell", type: "Points of Interest" },
	{
		title: "Barcelona Zoo",
		price: "€21",
		link: "https://zoobarcelona.cat/en/home",
		type: "Fun & Relaxing",
	},
	{
		title: "Free Museums",
		tags: ["1st Sunday of month"],
		type: "Fun & Relaxing",
	},
	{
		title: "Bungee Jump",
		price: "€45-€60",
		location: "130km outside the city",
		link: "http://Cataloniaadventures.com",
		type: "Sports & Activities",
	},
	{
		title: "Sagrada Familia",
		price: "€26-€36",
		tags: ["With tower option"],
		type: "Points of Interest",
	},
	{ title: "Biblioteca Gabriel García Márquez", type: "Points of Interest" },
	{ title: "Soccer", location: "Celebreak app", type: "Sports & Activities" },
	{ title: "White Rabbit Museum", price: "€25", type: "Points of Interest" },
	{
		title: "Observatori Fabra de Barcelona",
		tags: ["Free 1st Sunday"],
		type: "Points of Interest",
	},
	{ title: "Recinte Modernista de Sant Pau", type: "Points of Interest" },
	{
		title: "Aquarium",
		price: "€14",
		link: "https://tickets.aquariumbcn.com/?lang=es#",
		type: "Fun & Relaxing",
	},
	{ title: "Sala Apolo", location: "Sants-Montjuïc", type: "Live Music" },
	{
		title: "Bewake Park",
		price: "€40 for 2 hours",
		type: "Sports & Activities",
	},
	{
		title: "Sagrada Familia",
		price: "€26-€36",
		tags: ["With tower option"],
		type: "Points of Interest",
	},
	{
		title: "Montjuic Fortress",
		tags: ["Free 1st Sunday"],
		type: "Points of Interest",
	},
	{ title: "Sabda", tags: ["Immersive yoga"], type: "Fun & Relaxing" },
	{ title: "Razzmatazz", location: "Poble Nou", type: "Live Music" },
	{ title: "Rouge", location: "Poble Sec", type: "Live Music" },
	{ title: "Aire Spa", price: "€€€", type: "Fun & Relaxing" },
	{ title: "Comedy Clubhouse", type: "Fun & Relaxing" },
	{
		title: "Flotarium",
		price: "€75 for 2 people",
		tags: ["Sensory deprivation"],
		link: "https://www.flotarium.com/tienda/",
		type: "Fun & Relaxing",
	},
	{
		title: "Ceramics + Wine",
		price: "€25 each",
		link: "https://www.groupon.es/deals/tiwona-taller-de-ceramica-barcelona-workshops-coworking",
		type: "Fun & Relaxing",
	},
	{ title: "Glories Building", price: "€18", type: "Points of Interest" },
	{ title: "Flamenco Show", type: "Fun & Relaxing" },
];

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
