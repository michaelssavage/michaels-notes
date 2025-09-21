import type { IBite } from "@/types/Post";
import { BiteItem, Text, Year } from "./Bite.styled";

export const Bite = ({ date, description }: IBite) => {
  const year = date.split(" ").pop();

  return (
    <BiteItem>
      <Text>{description}</Text>
      <Year>{year}</Year>
    </BiteItem>
  );
};
