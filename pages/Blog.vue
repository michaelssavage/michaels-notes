<script setup lang="ts">
import type { BlogContent } from "~/types/Post";

useHead({
  title: "My Blog",
});

const external = ref(true);
const onSite = ref(true);
const backgroundColor = ref("#009a7b");

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const changeColor = () => {
  backgroundColor.value = getRandomColor();
};

const filteredItems = (list: BlogContent[]) => {
  list = list.filter((item) => !item.draft);
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
        <div class="hand"><IconsHand />Click me</div>
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
    <div
      class="circle expandAndAppear"
      :style="{ backgroundColor: backgroundColor }"
      @click="changeColor"
    />
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
  position: relative;
  .hand {
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: -1rem;
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
  &:hover {
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

.circle {
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: -10%;
  z-index: 2;
  overflow-x: hidden;
  @include for-tablet-only {
    visibility: hidden;
  }
}
</style>
