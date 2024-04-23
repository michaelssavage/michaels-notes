<script setup lang="ts">
defineProps({
	link: {
		type: String,
	},
	text: {
		type: String,
	},
	external: {
		type: Boolean,
		default: false,
	},
	isBig: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<NuxtLink
		:class="{ isBig: isBig, extLink: true }"
		:to="link"
		:external="external"
	>
		{{ text }}
	</NuxtLink>
</template>

<style scoped>
.isBig {
  font-size: 1.2rem;
}
</style>
