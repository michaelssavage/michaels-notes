<script setup lang="ts">
useHead({
  title: "My Blog",
});
const search = ref("");
const results = await searchContent(search);
</script>

<template>
  <main class="container">
    <form class="formSearch" autocomplete="off">
      <label for="search-blogs" class>Search blogs: </label>
      <input
        id="search-blogs"
        v-model="search"
        type="text"
        placeholder="Enter text..."
      />
    </form>

    <div class="colorKey">
      <p><IconsCircle color="#3d89fb" /> = Plant Bass'd</p>
      <p><IconsCircle color="#fb4d3d" /> = On site</p>
    </div>
    <ContentList path="/blog">
      <template #default="{ list }">
        <PostItems v-if="results.length > 0" :list="results" />
        <PostItems v-else :list="list" />
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>
  </main>
  <div class="circle"></div>
</template>

<style scoped lang="scss">
.container {
  margin: 2rem 5%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.formSearch {
  display: flex;
  justify-content: center;
  gap: 1rem;
  input {
    border-radius: 0.375rem;
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
  @include for-tablet-only {
    visibility: hidden;
  }
}
</style>
