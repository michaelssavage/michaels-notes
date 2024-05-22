import { Icon } from './.nuxt/components';
<script setup lang="ts">
useSeoMeta({
  title: "Michael Savage",
  ogTitle: "Michael Savage",
  ogUrl: "https://michaelsavage.ie",
  description: "This is my personal site for projects, blog, and bites.",
  ogDescription: "This is my personal site for projects, blog, and bites.",
  ogImage: "/images/cover.jpg",
  twitterCard: "summary_large_image",
});

useHead({
  htmlAttrs: {
    lang: "en",
    "data-theme": "light",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/images/project/emot.png",
    },
  ],
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
