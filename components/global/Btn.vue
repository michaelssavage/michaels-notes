<script setup lang="ts">
defineProps({
  link: { type: String },
  text: { type: String },
  external: { type: Boolean, default: false },
  isBig: { type: Boolean, default: true },
  isSmall: { type: Boolean, default: false },
  aqua: { type: Boolean, default: false },
});
</script>

<template>
  <div class="btnLink">
    <NuxtLink
      :to="link"
      :external="external"
      :target="external ? '_blank' : null"
    >
      <button :class="{ btn: true, isBig: isBig, aqua: aqua }">
        {{ text }}
      </button>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.btnLink {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.isBig {
  font-size: 1.2rem;
}

.aqua {
  background-color: $mint;
  &:hover {
    background-color: $ext-btn-bg-hover;
  }
}
</style>
