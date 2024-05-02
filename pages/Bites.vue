<script setup lang="ts">
import jsonData from "lists/bites.json";

useHead({
  title: "My Bites",
});

interface BiteI {
  id: number;
  title: string;
  link?: string;
}

const processString = (input: string, link?: string) => {
  const yearRegex = /{{(\d+)}}/g;

  const changedYear = input.replace(yearRegex, (_match, number) => {
    return `<span class="yearColor">${number}</span>`;
  });
  if (!link) return changedYear;

  const linkRegex = /<<([^>]+)>>/g;

  return changedYear.replace(linkRegex, (_match, text) => {
    return `<a class="extLink" href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
};

const bites = jsonData as BiteI[];
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="container">
    <ul class="biteList">
      <li
        v-for="bite in bites"
        :key="bite.id"
        class="listItem"
        v-html="processString(bite.title, bite.link)"
      />
    </ul>
  </main>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.container {
  margin: 2rem auto;
  width: 60%;
  @include for-phone-only {
    width: 90%;
  }
  ul {
    padding: 0;
  }
}

.biteList {
  margin: 0 0 2rem 0;
}

.listItem {
  list-style-type: none;
  background-color: var(--color-card);
  border: 1px solid var(--color-text);
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  @include for-phone-only {
    font-size: 1rem;
  }
}
</style>
