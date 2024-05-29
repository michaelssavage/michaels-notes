<script setup lang="ts">
import type { ProjectContent } from "~/types/Post";

useHead({
  title: "My Projects",
});
</script>

<template>
  <main class="container">
    <LazyContentList path="/project">
      <template #default="{ list }">
        <div class="row">
          <div
            v-for="project in sortById(list as ProjectContent[])"
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
                <p class="view">View More</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </LazyContentList>
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
  padding: 1rem 0.25rem 0 0.25rem;
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
  height: 100%;

  .view {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    opacity: 0;
    font-size: 1.2rem;
    padding: 2rem 0.5rem;
    transition: opacity 0.25s;
    color: $background;
    text-shadow: 3px 2px 4px #191919;
    height: 100%;
    @include for-phone-only {
      font-size: 1rem;
    }
  }

  &:hover {
    img {
      filter: blur(3px);
      -webkit-filter: blur(3px);
    }
    .view {
      opacity: 1;
    }
  }
}
</style>
