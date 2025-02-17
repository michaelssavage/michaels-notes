import type { IBite } from "@/types/Post";
import { BiteItem, Text, Year } from "./Bite.styled";

export const Bite = ({ date, description }: IBite) => {
	return (
		<BiteItem>
			<Text>{description}</Text>
			<Year>{date}</Year>
		</BiteItem>
	);
};
