<script setup lang="ts">
const { data } = await useFetch('/api/top-tracks');
</script>

<template>
	<div class="comp">
		<div v-if="!data">
			No tracks available
		</div>
		<ul v-else>
			<li
				v-for="track in data"
				:key="track.name"
			>
				{{ track.name }} by {{ track.artists.map(artist => artist.name).join(', ') }}
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.comp {
  margin: 0 4rem 2rem 4rem;
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
