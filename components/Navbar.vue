<template>
	<header>
		<nav>
			<NuxtLink to="/">
				Home
			</NuxtLink>
			<NuxtLink to="/about">
				About
			</NuxtLink>
			<NuxtLink to="/blog">
				Blog
			</NuxtLink>
			<NuxtLink to="/bites">
				Bites
			</NuxtLink>
			<NuxtLink to="/projects">
				Projects
			</NuxtLink>
		</nav>
	</header>
</template>

<style lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100vw;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 3rem 20%;
  text-transform: uppercase;
  font-style: italic;
  a {
    text-decoration: none;
    color: var(--color-text);
    &:hover {
      color: var(--color-grey);
      transform: scale(1.08);
    }
  }
}

.router-link-active {
  font-weight: bold;
}
</style>
