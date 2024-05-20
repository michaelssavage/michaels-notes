<template>
  <ul class="tag">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.tag {
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  width: 100%;
  background-color: var(--card);
}
</style>
