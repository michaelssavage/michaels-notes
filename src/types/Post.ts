import type { ReactNode } from "@tanstack/react-router";

export interface IBlog {
	code: string;
	slug: string;
	id: number;
	title: string;
	date: string;
	description: string;
	isExternal?: string;
	github?: string;
	draft?: boolean;
	isFirst: boolean;
}

export const TECHNOLOGIES = [
	"React.js",
	"TypeScript",
	"Express.js",
	"MDX",
	"MongoDB",
	"Next.js",
	"Nest.js",
	"BeautifulSoup",
	"Django",
	"Firestore",
	"PostgreSQL",
	"Python",
	"PYQT5",
	"React Query",
	"SciKit-Learn",
	"SCSS",
	"SpaCy",
	"Spring Boot",
] as const;

export type ITechnology = (typeof TECHNOLOGIES)[number];

export interface IProject {
	code: string;
	slug: string;
	id: number;
	image: string;
	title: string;
	date: string;
	description: string;
	technology: Array<ITechnology>;
	colors: {
		main: string;
		bg: string;
	};
	github?: string;
	draft?: boolean;
}

export interface IPosts {
	projects: Array<IProject>;
	blog: Array<IBlog>;
}

export interface IBite {
	id: number;
	title: ReactNode;
	year: number;
	tag: string;
	link?: string;
}
