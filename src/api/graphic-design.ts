import axios from "axios";
import { GITHUB_CONTENT, token } from "utils/constants";
import { GithubProps, GraphicsProps } from "utils/github-types";

const config = {
  headers: {
    Authorization: `token ${token}`,
    accept: "application/vnd.github+json",
  },
};

const getAllGraphics = async (dirURL: string, arrFiles?: GraphicsProps[]) => {
  const res = await axios.get(dirURL, config);
  const files = res.data;
  const allImages = arrFiles || [];

  files.forEach((file: GithubProps) => {
    if (file.type == "file" && file.name !== "README.md") {
      const graphic = {
        name: file.name.replace(/\.[^/.]+$/, ""),
        img: file.download_url,
        key: file.git_url,
      };
      allImages.push(graphic);
    } else if (file.type === "dir") {
      // If this is a directory, then recursively call function
      return getAllGraphics(file.url, allImages);
    } else {
      return;
    }
  });
  return allImages;
};

export const getGithubContent = async () => {
  const graphics = await getAllGraphics(GITHUB_CONTENT);
  return graphics;
};
