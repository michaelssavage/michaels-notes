<script setup lang="ts">
import type { CSSProperties } from "vue";

defineProps<{
  page: string;
  style?: CSSProperties;
}>();
</script>

<template>
  <div class="navigator">
    <IconsRight />
    <NuxtLink to="/" class="extLink pageLink" :style="style"> home </NuxtLink>
    <IconsRight />
    <NuxtLink :to="`/${page}`" class="extLink pageLink" :style="style">
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
  color: $mint;
  &:hover {
    color: $ext-btn-bg-hover;
  }
}
</style>
