export const sortByDate = <T extends { date: string }>(a: T, b: T): number => {
	return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const sortById = <T extends { id: number }>(a: T, b: T): number => {
	return a.id - b.id;
};

export const joinTags = (tags: Array<string>) => {
	return tags.map((tag) => `#${tag}`).join(" ");
};
