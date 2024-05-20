<template>
  <code class="wrapper"><slot /></code>
</template>

<style scoped lang="scss">
code {
  color: $header;
  font-weight: bold;
  font-style: italic;
}
.wrapper {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
