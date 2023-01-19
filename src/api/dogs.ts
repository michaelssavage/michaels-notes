import axios from "axios";

export const getDogPic = async () => {
  const res = await axios.get("https://api.thedogapi.com/v1/images/search");
  const url = res.data[0].url;
  const width = res.data[0].width;
  const height = res.data[0].height;

  return { url, width, height };
};
