export interface BlogContent {
  _path: string;
  title: string;
  date: string;
  external?: string;
  description: string;
}

export interface ProjectContent {
  id: number;
  slug: string;
  image: string;
  title: string;
  date: string;
  technology: Array<string>;
  github?: string;
  code: string;
}
