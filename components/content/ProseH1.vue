<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h1);
</script>

<template>
  <h1 :id="id" class="tag">
    <a v-if="generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>

<style lang="scss" scoped>
.tag {
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
</style>
