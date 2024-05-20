<script setup lang="ts">
import { joinTags } from "../Projects.vue";
</script>

<template>
  <article class="container">
    <ContentDoc v-slot="{ doc }">
      <PagePath v-if="doc._path" :page="doc._path.split('/')[1]" />
      <p class="date">
        {{ doc.date }}
      </p>
      <p class="tags">
        {{ joinTags(doc.technology) }}
      </p>
      <div class="content">
        <ContentRenderer :value="doc" />
        <Btn
          v-if="doc.github"
          :link="doc.github"
          text="GitHub Link"
          external
          aqua
        />
      </div>
    </ContentDoc>
  </article>
</template>

<style lang="scss" scoped>
.container {
  margin: 2rem auto;
  width: 40%;

  @include for-phone-only {
    width: 90%;
  }
}
.tags {
  font-size: 0.9rem;
  color: var(--square);
}
</style>
