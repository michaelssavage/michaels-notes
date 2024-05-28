<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { GetNowPlayingI } from "~/types/Spotify";

interface CurrentTrackI {
  body: GetNowPlayingI;
}

const fetcher = async () =>
  await $fetch<CurrentTrackI>(
    "https://kp4w175kk5.execute-api.eu-north-1.amazonaws.com/prod-api/current",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const { data, isLoading, suspense } = useQuery({
  queryKey: ["currently-playing"],
  queryFn: fetcher,
});

onServerPrefetch(async () => {
  await suspense();
});
</script>

<template v-if="data">
  <div class="comp">
    <h2 v-if="data?.body?.isPlaying">Currently listening to:</h2>
    <h2 v-else>Last track listened to:</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-if="!data?.body" class="nowPlaying">
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
