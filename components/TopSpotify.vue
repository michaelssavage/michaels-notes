<script setup lang="ts">
import type { SpotifyTopTracksI } from "~/composables/Spotify/Types";

defineProps<{
  topdata?: SpotifyTopTracksI | null;
}>();
</script>

<template>
  <div class="comp">
    <h2 class="title">Favourite Tracks:</h2>
    <div v-if="!topdata">No tracks available</div>
    <ol v-else class="trackNames">
      <li v-for="(track, index) in topdata.items" :key="track.name">
        <PrettyLink
          :link="track.href"
          :text="`${track.name} by ${track.artists.map((artist) => artist.name).join(', ')}`"
          external
        />
        <span v-if="index !== topdata.items.length - 1"> // </span>
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
