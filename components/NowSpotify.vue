<script setup lang="ts">
import type { GetNowPlayingI } from "~/types/Spotify";

interface CurrentTrackI {
  body: GetNowPlayingI;
}

const { data } = await useLazyFetch<CurrentTrackI>(
  "https://kp4w175kk5.execute-api.eu-north-1.amazonaws.com/prod-api/current",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
</script>

<template>
  <div class="comp">
    <h2 v-if="data?.body.isPlaying">Current song I'm listening to:</h2>
    <h2 v-else>Last track I listened to:</h2>
    <div v-if="!data?.body" class="nowPlaying">
      <IconsSpotify />
      <p>No info available</p>
    </div>
    <div class="nowPlaying">
      <NuxtImg
        :src="data?.body.albumArtUrl"
        alt="Album art cover pic"
        height="50"
        width="50"
      />
      <p class="songInfo">
        <PrettyLink
          :text="data?.body.trackTitle"
          :link="data?.body.trackUrl"
          external
        />
        by {{ data?.body.artist }}
      </p>
      <MusicBars v-if="data?.body.isPlaying" animate />
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
