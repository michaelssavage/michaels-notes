<script setup lang="ts">
import type { BlogContent } from "~/types/Post";

useHead({
  title: "My Blog",
});

const external = ref(true);
const toggleExternal = () => {
  external.value = !external.value;
};
const onSite = ref(true);
const toggleOnSite = () => {
  onSite.value = !onSite.value;
};

const filteredItems = (list: BlogContent[]) => {
  if (external.value && onSite.value) {
    return list;
  } else if (!external.value && onSite.value) {
    return list.filter((item) => !item.external);
  } else if (!onSite.value && external.value) {
    return list.filter((item) => item.external);
  } else {
    return [];
  }
};
</script>

<template class="page">
  <main>
    <div class="container">
      <div class="colorKey">
        <p :class="{ unused: !onSite }" @click="toggleOnSite">
          <IconsCircle color="#fb4d3d" /> = On site
        </p>
        <p :class="{ unused: !external }" @click="toggleExternal">
          <IconsCircle color="#3d89fb" /> = Plant Bass'd
        </p>
      </div>
      <LazyContentList v-slot="{ list }" path="/blog">
        <Post :list="filteredItems(list as BlogContent[])" />
      </LazyContentList>
    </div>
    <div class="circle" />
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
  place-items: center;
  gap: 0.5rem;
  input {
    border-radius: 0.25rem;
    &:focus {
      outline: solid 2px var(--color-aqua);
    }
  }
}
.colorKey {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  p {
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }
}
.unused {
  svg {
    stroke-width: 1;
    stroke: grey;
    fill: transparent;
  }
}

.circle {
  width: 25rem;
  height: 25rem;
  background-color: var(--color-aqua);
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: -10%;
  z-index: -1;
  overflow-x: hidden;
  @include for-tablet-only {
    visibility: hidden;
  }
}
</style>
