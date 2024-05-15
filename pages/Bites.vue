<script setup lang="ts">
import jsonData from "lists/bites.json";

useHead({
  title: "My Bites",
});

interface BiteI {
  id: number;
  title: string;
  link?: string;
  year: number;
}

const processString = (input: string, link?: string) => {
  const linkRegex = /<<([^>]+)>>/g;

  return input.replace(linkRegex, (_match, text) => {
    return `<a class="extLink" href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
};

const bites = jsonData as BiteI[];
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="container">
    <ul class="biteList">
      <li v-for="bite in bites" :key="bite.id" class="bite">
        <p class="yearColor">{{ bite.year }}</p>
        <p class="biteText" v-html="processString(bite.title, bite.link)" />
      </li>
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
  .bite {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0rem;
    margin-bottom: 2rem;

    .yearColor {
      font-weight: bold;
      transition: 0.3s ease-in-out;
      transform: rotate(-90deg);
    }

    .biteText {
      list-style-type: none;
      background-color: var(--color-card);
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      width: 100%;
      font-size: 1.2rem;
      box-shadow:
        #009a7b66 5px 5px,
        #009a7b4d 10px 10px,
        #009a7b33 15px 15px,
        #009a7b1a 20px 20px;
      transition: 0.3s ease-in-out;
      @include for-phone-only {
        font-size: 1rem;
      }
    }

    &:hover {
      .yearColor {
        transform: rotate(0deg);
      }

      .biteText {
        box-shadow: #009a7b66 5px 5px;
      }
    }
  }
}
</style>
