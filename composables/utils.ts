export const sortByDate = <T extends { date: string }>(items: T[]): T[] => {
  return items.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
};

export const sortById = <T extends { id: number }>(items: T[]): T[] => {
  return items.slice().sort((a, b) => a.id - b.id);
};

export const joinTags = (tags: Array<string>) => {
  return tags.map((tag) => `#${tag}`).join(" ");
};
