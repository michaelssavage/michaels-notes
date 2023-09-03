export interface Post {
  image: string;
  title: string;
  date: string;
  live: boolean;
}

export interface BlogPost extends Post {
  tags: string[];
  slug: string;
  external?: string;
  content: string;
  description: string;
}

export interface ProjectPost extends Post {
  slug: string;
  description: string;
}
