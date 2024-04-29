<script setup lang="ts">
const { data } = await useFetch('/api/top-tracks');
</script>

<template>
	<div class="comp">
		<h2>What are my top tracks?</h2>
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
  align-items: center;
  flex-direction: column;
  padding: 0 1rem;
}
.trackNames {
  > li {
    display: inline;
    padding: 0;
  }
  > li:nth-child(even) {
    a {
      color: var(--color-blue);
    }
  }
}
</style>
