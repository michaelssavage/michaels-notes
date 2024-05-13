<script setup lang="ts">
defineProps({
  externalLink: { type: String },
  internalLink: { type: String },
});
</script>

<template>
  <NuxtLink
    :to="externalLink ? externalLink : internalLink"
    :external="externalLink !== undefined"
    :target="externalLink ? '_blank' : null"
  >
    <button :class="{ btn: true, isExternal: externalLink }">
      Read More <IconsExternalLink v-if="externalLink" />
    </button>
  </NuxtLink>
</template>

<style scoped lang="scss">
.btn {
  font-size: 0.85rem;
  padding: 0.25rem 1rem;
  border-radius: 0.75rem;
  color: var(--color-white);
  text-transform: uppercase;
  background-color: var(--color-orange);

  &:hover {
    background-color: var(--color-header);
    transform: scale(1.05);
  }
}
a {
  text-decoration: none;
}
.isExternal {
  background-color: var(--color-blue);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: var(--color-dark-blue);
    transform: scale(1.05);
  }
}
</style>
