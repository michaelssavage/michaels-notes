export interface IBlog {
  _path: string;
  title: string;
  date: string;
  external?: string;
  description: string;
}

export interface IProject {
  id: number;
  slug: string;
  image: string;
  title: string;
  date: string;
  technology: Array<string>;
  github?: string;
  code: string;
}

export interface IPosts {
  projects: IProject[];
  blog: IBlog[];
}
