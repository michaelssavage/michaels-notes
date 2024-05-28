<script setup lang="ts">
import type { CurrentTrackI } from "~/types/Spotify";

defineProps<{
  data?: CurrentTrackI;
  isLoading: boolean;
}>();
</script>

<template v-if="data">
  <div class="comp">
    <h2>
      {{
        data?.body?.isPlaying
          ? "Currently listening to:"
          : "Last track listened to:"
      }}
    </h2>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="!data?.body" class="nowPlaying">
      <IconsSpotify />
      <p>No info available</p>
    </div>
    <div v-else class="nowPlaying">
      <NuxtImg
        :src="data?.body?.albumArtUrl"
        alt="Album art cover pic"
        height="50"
        width="50"
      />
      <MusicBars v-if="data?.body?.isPlaying" animate />
      <p class="songInfo">
        <PrettyLink
          :text="data?.body?.trackTitle"
          :link="data?.body?.trackUrl"
          external
        />
        by {{ data?.body?.artist }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comp {
  display: flex;
  flex-direction: column;
}

.nowPlaying {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}
</style>
