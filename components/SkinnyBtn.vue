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
  color: $background;
  text-transform: uppercase;
  background-color: $btn-bg;

  &:hover {
    background-color: $header;
    transform: scale(1.05);
  }
}
a {
  text-decoration: none;
}
.isExternal {
  background-color: $ext-btn-bg;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: $ext-btn-bg-hover;
    transform: scale(1.05);
  }
}
</style>
