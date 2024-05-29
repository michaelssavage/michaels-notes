<script setup lang="ts">
const backgroundColor = ref("#009a7b");

const getRandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
};

const changeColor = () => {
  backgroundColor.value = getRandomColor();
};
</script>

<template>
  <div
    class="circle expandAndAppear"
    :style="{ backgroundColor: backgroundColor }"
    @click="changeColor"
  ></div>
</template>

<style scoped lang="scss">
.circle {
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: -10%;
  z-index: 2;
  overflow-x: hidden;
  @include for-tablet-only {
    visibility: hidden;
  }
}
</style>
