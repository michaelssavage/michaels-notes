<template>
  <div
    class="circle expandAndAppear"
    :style="{ backgroundColor: backgroundColor }"
    @click="changeColor"
  ></div>
</template>

<script setup lang="ts">
const backgroundColor = ref("#009a7b");

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const changeColor = () => {
  backgroundColor.value = getRandomColor();
};
</script>

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
