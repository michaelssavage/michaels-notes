<script setup lang="ts">
defineProps({
  link: { type: String },
  external: { type: Boolean, default: false },
});
</script>

<template>
  <NuxtLink
    :to="link"
    :external="external"
    :target="external ? '_blank' : null"
    class="icon-link"
  >
    <slot />
  </NuxtLink>
</template>
