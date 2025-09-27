import type { IBite } from "@/types/Post";
import { BiteItem, Text, Year } from "./Bite.styled";

export const Bite = ({ id, date, description, type }: IBite) => {
  return (
    <BiteItem tabIndex={0} aria-labelledby={id}>
      <Text>
        <p data-id="date">{date}</p>
        <p data-id="description">{description}</p>
      </Text>
      <Year>{type}</Year>
    </BiteItem>
  );
};
