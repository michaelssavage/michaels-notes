export interface IBlog {
  slug: string;
  code: string;
  title: string;
  date: string;
  description: string;
  github?: string;
  draft?: boolean;
  isExternal?: string;
  isFirst: boolean;
  type: "blog";
}

export interface IReview {
  slug: string;
  code: string;
  releaseYear: number;
  title: string;
  date: string;
  description: string;
  director: string;
  draft?: boolean;
  isExternal?: string;
  isFirst: boolean;
  type: "review";
}

export interface IBite {
  id: string;
  slug: string;
  date: string;
  description: string;
  link?: string;
  type: "bite";
}

export const TECHNOLOGIES = [
  "React.js",
  "Express.js",
  "MDX",
  "MongoDB",
  "Next.js",
  "Nest.js",
  "PostgreSQL",
  "TypeScript",
  "BeautifulSoup",
  "Django",
  "Firestore",
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
  blogs: Array<IBlog>;
  reviews: Array<IReview>;
  bites: Array<IBite>;
}
