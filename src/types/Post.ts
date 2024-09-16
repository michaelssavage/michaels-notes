export interface IBlog {
  code: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  external?: string;
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
