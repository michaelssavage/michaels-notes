<script setup lang="ts">
import type { BlogContent } from "~/types/Post";

useHead({
  title: "My Blog",
});

const external = ref(true);
const onSite = ref(true);

const filteredItems = (list: BlogContent[]) => {
  return list.filter((item) => {
    if (item.draft) return false;
    if (external.value && onSite.value) return true;
    if (onSite.value) return !item.external;
    if (external.value) return item.external;
    return false;
  });
};
</script>

<template class="page">
  <main>
    <div class="container">
      <div class="colorKey">
        <IconsHand class="hand" />
        <p :class="{ unused: !onSite }" @click="onSite = !onSite">
          <IconsCircle color="#fb4d3d" /> = On site
        </p>
        <p :class="{ unused: !external }" @click="external = !external">
          <IconsCircle color="#3d89fb" /> = Plant Bass'd
        </p>
      </div>
      <LazyContentList v-slot="{ list }" path="/blog">
        <Post :list="filteredItems(list as BlogContent[])" />
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

.formSearch {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  input {
    border-radius: 0.25rem;
    &:focus {
      outline: solid 2px $mint;
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
