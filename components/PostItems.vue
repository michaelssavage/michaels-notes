<script setup lang="ts">
import type { BlogContent } from "~/types/Post";

defineProps<{
  list: BlogContent[];
}>();
const sortByDate = (posts: BlogContent[]) => {
  return posts.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
};
</script>

<template>
  <div v-for="post in sortByDate(list)" :key="post._path" class="postItem">
    <div class="card">
      <div class="cardInfo">
        <div>
          <h2 class="title">
            {{ post.title }}
          </h2>
          <p class="date">
            {{ post.date }}
          </p>
        </div>
        <div>
          <a v-if="post.external" :href="post.external">
            <button class="btn external">Read More<IconsExternalLink /></button>
          </a>
          <button v-else class="btn" @click="$router.push(post._path)">
            Read More
          </button>
        </div>
      </div>
      <p class="description">
        {{ post.description }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.postItem {
  display: flex;
  align-items: flex-start;
  @include for-phone-only {
    display: block;
  }
}
.card {
  padding: 1rem;
  border: 1px solid var(--color-text);
  background-color: var(--color-card);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 1rem;
}
.cardInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  @include for-phone-only {
    justify-content: space-between;
  }
}
.title {
  font-size: 1rem;
}
.date {
  font-style: italic;
  font-size: 0.85rem;
  color: var(--color-header);
}
.description {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @include for-phone-only {
    font-size: 0.9rem;
    white-space: wrap;
    text-overflow: unset;
    overflow: unset;
    width: 100%;
  }
}
.btn {
  font-size: 0.85rem;
  padding: 0.25rem 1rem;
  border-radius: 0.75rem;
  color: var(--color-white);
  text-transform: uppercase;
  background-color: var(--color-orange);

  &:hover {
    background-color: var(--color-header);
    transform: scale(1.05);
  }
}
a {
  text-decoration: none;
}
.external {
  background-color: var(--color-blue);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: var(--color-dark-blue);
    transform: scale(1.05);
  }
}
</style>
