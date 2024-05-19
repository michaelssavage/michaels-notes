<template>
  <pre :class="$props.class"><slot /></pre>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
</script>

<style scoped lang="scss">
pre {
  margin-top: 0;
  margin-bottom: 1rem;
  background-color: $text;
  padding: 0.5rem;
  border-radius: 0.25rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
pre code .line {
  display: block;
}
</style>
