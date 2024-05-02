<script setup lang="ts">
const { data } = await useFetch("/api/now-playing");
</script>

<template>
  <div class="comp">
    <h2>What am I listening to?</h2>
    <div v-if="!data?.isPlaying" class="nowPlaying">
      <IconsSpotify />
      <p>Nothing currently</p>
    </div>
    <div v-if="data?.isPlaying" class="nowPlaying">
      <NuxtImg
        :src="data?.albumArtUrl"
        alt="Album art cover pic"
        height="80"
        width="80"
      />
      <div class="songInfo">
        <PrettyLink :text="data?.trackTitle" :link="data?.trackUrl" external />

        <p>{{ data?.artist }}</p>
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
