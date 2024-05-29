<script setup lang="ts">
defineProps({
  src: { type: String },
  alt: { type: String },
  center: { type: Boolean, default: false },
  sizes: { type: String, default: "100px md:200px" },
  inPost: { type: Boolean, default: false },
});
</script>

<template>
  <NuxtImg
    :class="{ center: center, imgStyle: !inPost, inPost: inPost }"
    :src="src"
    :alt="alt"
    :sizes="sizes"
    :placeholder="[100, 50, 10]"
  />
</template>

<style scoped>
.center {
  margin: 0 auto;
}
.imgStyle {
  padding: 0 0 0.5rem 0.5rem;
}
.inPost {
  padding: 0;
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>
