<script setup lang="ts">
import type { ProjectContent } from "~/types/Post";

useHead({
  title: "My Projects",
});

const sortedItems = (projects: ProjectContent[]) => {
  return projects.slice().sort((a, b) => a.id - b.id);
};
</script>

<script lang="ts">
export const joinTags = (tags: Array<string>) => {
  return tags.map((tag) => `#${tag}`).join(" ");
};
</script>

<template>
  <main class="container">
    <ContentList path="/project">
      <template #default="{ list }">
        <div class="row">
          <div
            v-for="project in sortedItems(list as ProjectContent[])"
            :key="project.id"
            class="col"
          >
            <NuxtLink :to="project._path" class="projectImg">
              <div class="overlay">
                <NuxtImg
                  :src="project.image"
                  :alt="project.title"
                  :placeholder="[500, 300, 10]"
                />
                <p class="tech">
                  {{ joinTags(project.technology) }}
                </p>
              </div>
              <p class="title">{{ project.id }}. {{ project.title }}</p>
            </NuxtLink>
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
  @include for-phone-only {
    margin: 0 5% 2rem 5%;
  }
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
  &:hover {
    img {
      filter: blur(2px);
      -webkit-filter: blur(2px);
    }
    .title {
      font-weight: bold;
    }
    .tech {
      opacity: 1;
    }
  }
  @include for-tablet-only {
    width: 50%;
  }
  @include for-phone-only {
    width: 100%;
  }
}

.projectImg {
  text-decoration: none;
  color: var(--text);
  img {
    cursor: pointer;
    transition: filter 0.3s;
  }
}

.overlay {
  position: relative;
  width: 99%;
}

.tech {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  opacity: 0;
  font-size: 1.2rem;
  padding: 1rem 0.5rem;
  transition: opacity 0.25s;
  color: $background;
  background-color: rgb(25, 25, 25, 0.4);
  height: 100%;
  @include for-phone-only {
    font-size: 1rem;
  }
}

.title {
  text-align: center;
  font-style: italic;
}
</style>
