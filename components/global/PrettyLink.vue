<script setup lang="ts">
defineProps({
  link: { type: String },
  text: { type: String },
  external: { type: Boolean, default: false },
  isBig: { type: Boolean, default: false },
});
</script>

<template>
  <NuxtLink
    :class="{ extLink: true, isBig: isBig }"
    :to="link"
    :external="external"
    :target="external ? '_blank' : null"
  >
    {{ text ? text : link }}
  </NuxtLink>
</template>

<style scoped>
.isBig {
  font-size: 1.2rem;
}
</style>
