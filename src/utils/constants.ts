const user = process.env.GITHUB_USER;
const repo = process.env.GITHUB_REPO;
export const token = process.env.GITHUB_TOKEN;
export const GITHUB_CONTENT = `https://api.github.com/repos/${user}/${repo}/contents`;

export const LETTERBOXD_URI =
  "https://letterboxd.com/ottobio/list/my-favourites-1/";
