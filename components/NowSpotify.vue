<script setup lang="ts">
import type {
  GetNowPlayingTransformed,
  NotPlayingI,
} from "~/composables/Spotify/Types";

defineProps<{
  nowdata?: GetNowPlayingTransformed | NotPlayingI | null;
}>();
</script>

<template>
  <div class="comp">
    <h2>What am I listening to?</h2>
    <div v-if="!nowdata?.isPlaying" class="nowPlaying">
      <IconsSpotify />
      <p>Nothing currently</p>
    </div>
    <div v-if="nowdata?.isPlaying" class="nowPlaying">
      <NuxtImg
        :src="nowdata?.albumArtUrl"
        alt="Album art cover pic"
        height="80"
        width="80"
      />
      <div class="songInfo">
        <PrettyLink
          :text="nowdata?.trackTitle"
          :link="nowdata?.trackUrl"
          external
        />

        <p>{{ nowdata?.artist }}</p>
      </div>
      <MusicBars animate />
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
  gap: 0.75rem;
}

.songInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
