<script setup lang="ts">
useHead({
	title: 'My Projects',
});

interface ProjectI {
	_path: string;
	id: number;
	image: string;
	title: string;
}

const sortedItems = (projects: ProjectI[]) => {
	return projects.slice().sort((a, b) => a.id - b.id);
};
</script>

<template>
	<main class="container">
		<ContentList path="/project">
			<template #default="{ list }">
				<div class="row">
					<div
						v-for="project in sortedItems(list)"
						:key="project.id"
						class="col"
					>
						<NuxtLink
							:to="project._path"
							class="projectImg"
						>
							<img
								:src="project.image"
								:alt="project.title"
							>
							<p class="title">
								{{ project.id }}. {{ project.title }}
							</p></NuxtLink>
					</div>
				</div>
			</template>
			<template #not-found>
				<p>No articles found.</p>
			</template>
		</ContentList>
	</main>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  margin: 0 15% 2rem 15%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
}

.col {
  flex: 0 0 auto;
  width: 33.333%;
  padding: 1rem 0.75rem 0 0.75rem;
  @include for-tablet-only {
    width: 50%;
  }
  @include for-phone-only {
    width: 100%;
  }
}

.projectImg {
  text-decoration: none;
  color: var(--color-text);
  img {
    cursor: pointer;
    &:hover {
      filter: blur(1px);
      -webkit-filter: blur(2px);
      &:hover + .title {
        font-weight: bold;
      }
    }
  }
}

.title {
  text-align: center;
  font-style: italic;
}
</style>
