<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h2);
</script>

<template>
  <h2 :id="id" class="tag">
    <a v-if="id && generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<style lang="scss" scoped>
.tag {
  font-size: 1.6rem;
  font-style: italic;
  position: relative;
  a {
    color: var(--color-text);
    text-decoration: none;
  }
  &::after {
    content: "#";
    position: absolute;
    top: -0.25rem;
    left: -2rem;
    color: var(--color-text);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1.6rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover {
    a {
      text-decoration: underline;
    }
    &::after {
      opacity: 1; // Make the tooltip visible when hovering over the link
    }
  }
}
</style>
