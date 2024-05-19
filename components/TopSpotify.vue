<script setup lang="ts">
import type { TopTracksI } from "~/types/Spotify";

const { data } = await useLazyFetch<TopTracksI>(
  "https://kp4w175kk5.execute-api.eu-north-1.amazonaws.com/prod-api",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
</script>

<template>
  <div class="comp">
    <h2 class="title">Most Played Tracks:</h2>
    <div v-if="!data?.body">No tracks available</div>
    <ol v-else class="trackNames">
      <li v-for="(track, index) in data?.body" :key="track.name">
        <PrettyLink
          :link="track.url"
          :text="`${track.name} by ${track.artists}`"
          externals
        />
        <span v-if="index !== data?.body.length - 1"> // </span>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.comp {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.title {
  display: flex;
  flex-direction: row;
  svg {
    color: var(--color-blue);
  }
}
.trackNames {
  padding: 0;
  @include for-phone-only {
    padding-right: 5%;
  }
  > li {
    display: inline;
    padding: 0;
  }
}
</style>
