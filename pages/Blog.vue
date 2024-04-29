<script setup lang="ts">
import type { BlogContent } from '~/types/Post';

useHead({
	title: 'My Blog',
});
</script>

<template class="page">
	<main>
		<div class="container">
			<div class="colorKey">
				<p><IconsCircle color="#3d89fb" /> = Plant Bass'd</p>
				<p><IconsCircle color="#fb4d3d" /> = On site</p>
			</div>
			<ContentList path="/blog">
				<template #default="{ list }">
					<PostItems
						:list="list as BlogContent[]"
					/>
				</template>
				<template #not-found>
					<p>No articles found.</p>
				</template>
			</ContentList>
		</div>
		<div class="circle" />
	</main>
</template>

<style scoped lang="scss">
.resultItem {
  background-color: pink
}

.page {
  position: relative;
}
.container {
  margin: 2rem 5%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.formSearch {
  display: flex;
  place-items: center;
  gap: 0.5rem;
  input {
    border-radius: 0.25rem;
    &:focus {
      outline: solid 2px var(--color-aqua);
    }
  }
}
.colorKey {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  p {
    display: flex;
    flex-direction: row;
  }
}
.circle {
  width: 25rem;
  height: 25rem;
  background-color: var(--color-aqua);
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: -10%;
  z-index: -1;
  overflow-x: hidden;
  @include for-tablet-only {
    visibility: hidden;
  }
}
</style>
