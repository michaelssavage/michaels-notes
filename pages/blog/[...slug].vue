<script setup lang="ts"></script>

<template>
  <article class="container">
    <ContentDoc v-slot="{ doc }">
      <p class="date">
        {{ doc.date }}
      </p>
      <div class="content">
        <PagePath
          v-if="doc._path"
          :page="doc._path.split('/')[1]"
          :style="{ color: '#ca1551' }"
          class="paths"
        />
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
  margin: 0 auto 2rem auto;
  width: 40%;

  @include for-phone-only {
    width: 90%;
  }
}

.content {
  position: relative;
}

.paths {
  position: absolute;
  top: 0.6rem;
  left: -12rem;
  @include for-tablet-only {
    left: -9rem;
  }
  @include for-phone-only {
    width: 90%;
    position: static;
  }
}
</style>
