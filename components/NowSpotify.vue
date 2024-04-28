<script setup lang="ts">
const { data } = await useFetch('/api/now-playing');
</script>

<template>
	<div class="comp">
		<h1>What am I listening to?</h1>
		<div
			v-if="!data?.isPlaying"
			class="nowPlaying"
		>
			<p>Nothing currently</p>
			<IconsSpotify />
		</div>
		<div
			v-if="data?.isPlaying"
			class="nowPlaying"
		>
			<NuxtImg
				:src="data?.albumArtUrl"
				alt="Album art cover pic"
				height="100"
				width="100"
			/>
			<div class="songInfo">
				<PrettyLink
					:text="data?.trackTitle"
					:link="data?.trackUrl"
					external
					is-big
				/>

				<p>{{ data?.artist }}</p>
			</div>
			<MusicBars animate />
		</div>
	</div>
</template>

<style scoped lang="scss">
.comp {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem;
}

.nowPlaying {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.songInfo {
  display:flex;
  flex-direction: column;
  justify-content: center;
  a, p {
    font-size: 1.6rem;
  }
}
</style>
