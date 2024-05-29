<script setup lang="ts">
import type { BlogContent } from "~/types/Post";

useHead({
  title: "My Blog",
});

const searchQuery = ref("");
const external = ref(true);
const onSite = ref(true);

const filterPosts = (list: BlogContent[]) => {
  const searchLowercase = searchQuery.value.toLowerCase();

  return list.filter((item) => {
    if (
      !item.title.toLowerCase().includes(searchLowercase) ||
      !item.description.toLowerCase().includes(searchLowercase)
    ) {
      return false;
    }

    if (item.draft) {
      return false;
    }

    if (external.value && onSite.value) {
      return true;
    }

    if (onSite.value) {
      return !item.external;
    }

    if (external.value) {
      return item.external;
    }

    return false;
  });
};
</script>

<template class="page">
  <main>
    <div class="container">
      <div class="searchWrapper">
        <label class="sr-only" for="search-item">Search</label>
        <div class="searchBox">
          <input
            id="search-item"
            v-model="searchQuery"
            placeholder="Search Blogs..."
            type="search"
          />
          <IconsSearch class="searchIcon" />
        </div>
      </div>
      <div class="colorKey">
        <IconsHand class="hand" />
        <p :class="{ unused: !onSite }" @click="onSite = !onSite">
          <IconsCircle color="#fb4d3d" /> = On site
        </p>
        <p :class="{ unused: !external }" @click="external = !external">
          <IconsCircle color="#3d89fb" /> = Plant Bass'd
        </p>
      </div>
      <LazyContentList path="/blog">
        <template #default="{ list }">
          <Post :list="filterPosts(list as BlogContent[])" />
        </template>
        <template #not-found>
          <p>No articles found.</p>
        </template>
      </LazyContentList>
    </div>
    <LazyBall />
  </main>
</template>

<style scoped lang="scss">
.resultItem {
  background-color: pink;
}

.page {
  position: relative;
}

.container {
  margin: 2rem 5%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.searchWrapper {
  display: flex;
  justify-content: center;
  width: 100%;

  .sr-only {
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    clip: rect(0, 0, 0, 0);
    border-width: 0;
    white-space: nowrap;
  }

  .searchBox {
    position: relative;
    display: flex;
    align-items: center;

    input {
      font-size: 0.875rem;
      line-height: 1.25rem;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
      border-color: $text;
      border-width: 2px;
      border-radius: 9999px;
      width: 100%;
      &:focus {
        outline: solid 2px $mint;
      }
    }

    .searchIcon {
      color: $text;
      position: absolute;
      left: 0.5rem;
      height: 1.5rem;
      width: 1.5rem;
      background-color: transparent;
      color: $hover-text;
    }
  }
}

.colorKey {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  position: relative;

  .hand {
    opacity: 0;
    position: absolute;
    left: 49%;
    transform: translate(-50%, -50%);
    top: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    transition: opacity 1.25s ease-in-out;
  }

  p {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    z-index: 3;
  }

  &:hover:not(:focus) {
    .hand {
      opacity: 1;
      transition: opacity 0.1s ease-in-out;
    }
  }
}

.unused {
  svg {
    stroke-width: 1;
    stroke: grey;
    fill: transparent;
  }
}
</style>
