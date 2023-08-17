export type BlogPost = {
  image: string;
  tags: string[];
  slug: string;
  title: string;
  date: string;
  live: boolean;
  external?: string;
  content: string;
  description: string;
};
