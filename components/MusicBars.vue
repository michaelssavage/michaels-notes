<script setup lang="ts">
defineProps<{
  animate: boolean;
}>();
</script>

<template>
  <div class="container">
    <div :class="animate ? 'icon animateMusicBars' : 'icon'">
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
}

.icon {
  display: flex;
  justify-content: space-between;
  width: 1.6rem;
  height: 1.6rem;

  span {
    width: 0.4rem;
    height: 100%;
    background-color: var(--color-header);
    border-radius: 3px;
    transform-origin: bottom;
    content: "";
  }
}
</style>
