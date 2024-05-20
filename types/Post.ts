import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export interface BlogContent extends ParsedContent {
  _path: string;
  title: string;
  date: string;
  external?: string;
  description: string;
}

export interface ProjectContent extends ParsedContent {
  _path: string;
  id: number;
  image: string;
  title: string;
  technology: Array<string>;
}
