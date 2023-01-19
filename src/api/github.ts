/* eslint-disable no-console */
import axios from "axios";
import { GITHUB_CONTENT, token } from "utils/constants";
import { GithubProps, GraphicsProps } from "utils/github-types";

const config = {
  headers: {
    Authorization: `token ${token}`,
    accept: "application/vnd.github+json",
  },
};

const getAllGraphics = async (url: string, lstOfFiles?: GraphicsProps[]) => {
  try {
    const res = await axios.get(url, config);
    let allFiles = lstOfFiles || [];

    let idx = 0;
    const content: GithubProps[] = res.data;

    while (idx < content.length) {
      const file = content[idx];
      if (file.type === "dir") {
        allFiles = await getAllGraphics(file.url, allFiles);
      } else if (file.type === "file" && file.name !== "README.md") {
        allFiles.push({
          name: file.name.replace(/\.[^/.]+$/, ""),
          img: file.download_url,
          key: file.git_url,
        });
      }
      idx++;
    }
    return allFiles;
  } catch (error) {
    console.log(error);
    return [] as GraphicsProps[];
  }
};

export const getGithubContent = () => {
  return getAllGraphics(GITHUB_CONTENT);
};
