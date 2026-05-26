import type { IBite } from "@/types/Post";
import { BiteItem, Text, Year } from "./Bite.styled";

export const Bite = ({ id, date, description, type }: IBite) => {
  return (
    <BiteItem tabIndex={0} aria-labelledby={id}>
      <Year>{type}</Year>
      <Text>
        <p data-id="description">{description}</p>
        <p data-id="date">{date}</p>
      </Text>
    </BiteItem>
  );
};
