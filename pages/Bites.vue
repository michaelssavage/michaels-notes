<script setup lang="ts">
import jsonData from 'lists/bites.json';

useHead({
	title: 'My Bites',
});

interface BiteI {
	id: number;
	title: string;
	link?: string;
}

const processString = (input: string, link?: string) => {
	const yearRegex = /{{(\d+)}}/g;

	const changedYear = input.replace(yearRegex, (match, number) => {
		return `<span class="yearColor">${number}</span>`;
	});
	if (!link) return changedYear;

	const linkRegex = /<<([^>]+)>>/g;

	return changedYear.replace(linkRegex, (match, text) => {
		return `<a class="extLink" href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>`;
	});
};

const bites = jsonData as BiteI[];
</script>

<template>
	<main class="container">
		<ul>
			<li
				v-for="bite in bites"
				:key="bite.id"
				class="listItem"
				v-html="processString(bite.title, bite.link)"
			/>
		</ul>
	</main>
</template>

<style lang="scss" scoped>
.container {
  margin: 2rem 0;
  ul {
    padding: 0;
  }
}

.listItem {
  list-style-type: none;
  border-bottom: 1px solid var(--color-text);
  margin: 0 15% 2rem 15%;
  font-size: 1.2rem;
}
</style>
