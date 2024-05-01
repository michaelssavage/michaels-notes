<script setup lang="ts">
const { data } = await useFetch('/api/top-tracks');
</script>

<template>
	<div class="comp">
		<h2>Favourite Tracks:</h2>
		<div v-if="!data">
			No tracks available
		</div>
		<ol
			v-else
			class="trackNames"
		>
			<li
				v-for="track, index in data.items"
				:key="track.name"
			>
				<PrettyLink
					:link="track.href"
					:text="`${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`"
					external
				/>
				<span v-if="index !== data.items.length - 1"> // </span>
			</li>
		</ol>
	</div>
</template>

<style scoped lang="scss">
.comp {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  padding-left: 2rem;
}
.trackNames {
    padding-left: 0;
  > li {
    display: inline;
    padding: 0;
  }
}
</style>
