<script setup lang="ts">
defineProps<{
  link: string;
  text: string;
}>();
</script>

<template>
  <a class="extLink" :href="link" target="_blank" rel="noopener noreferrer">{{
    text
  }}</a>
</template>
