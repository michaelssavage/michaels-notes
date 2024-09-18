import type { ReactNode } from "@tanstack/react-router";

export interface IBlog {
  code: string;
  slug: string;
  id: number;
  title: string;
  date: string;
  description: string;
  external?: string;
  github?: string;
  draft?: boolean;
}

export interface IProject {
  code: string;
  slug: string;
  id: number;
  image: string;
  title: string;
  date: string;
  technology: Array<string>;
  github?: string;
  draft?: boolean;
}

export interface IPosts {
  projects: IProject[];
  blog: IBlog[];
}

export interface IBite {
  id: number;
  title: ReactNode;
  year: number;
  tag: string;
  link?: string;
}
