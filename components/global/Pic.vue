<script setup lang="ts">
defineProps({
  src: { type: String },
  alt: { type: String },
  isFloat: { type: Boolean, default: true },
  sizes: { type: String, default: "100px md:100px" },
});
</script>

<template>
  <NuxtImg
    :class="{ isFloat: isFloat, imgStyle: true }"
    :src="src"
    :alt="alt"
    :sizes="sizes"
  />
</template>

<style scoped>
.isFloat {
  float: right;
}
.imgStyle {
  padding: 0 0 0.5rem 0.5rem;
}
</style>
