<script setup>
defineProps({
	src: String,
	alt: String,
});
</script>

<template>
	<NuxtImg
		:src="src"
		:alt="alt"
		sizes="50vw sm:25vw md:200px"
		format="webp"
		loading="lazy"
	/>
</template>
