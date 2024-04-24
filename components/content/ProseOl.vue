<template>
	<ol class="tag">
		<slot />
	</ol>
</template>

<style lang="scss" scoped>
.tag {
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  width: 75%;
  background-color: lighten(#ebd894, 10%);
}
</style>
