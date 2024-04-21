<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<template>
  <a :href="link" class="icon-link"><slot></slot></a>
</template>
