<script setup lang="ts">
defineProps({
  page: { type: String },
});
</script>

<template>
  <div class="navigator">
    <IconsRight />
    <NuxtLink to="/" class="extLink pageLink"> home </NuxtLink>
    <IconsRight />
    <NuxtLink :to="`/${page}`" class="extLink pageLink">
      {{ page }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.navigator {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    margin-bottom: -0.25rem;
  }
}

.pageLink {
  font-size: 1.2rem;
  text-decoration: none;
  font-style: italic;
  color: var(--color-aqua);
  &:hover {
    color: var(--color-dark-blue);
  }
}
</style>
