<template>
  <header>
    <nav>
      <NuxtLink to="/"> Home </NuxtLink>
      <NuxtLink to="/about"> About </NuxtLink>
      <NuxtLink to="/blog"> Blog </NuxtLink>
      <NuxtLink to="/projects"> Projects </NuxtLink>
      <NuxtLink to="/bites"> Bites </NuxtLink>
    </nav>
    <Toggle />
  </header>
</template>

<style lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  position: relative;
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
    z-index: 3;
    text-decoration: none;
    color: var(--text);
    transition:
      color 0.3s cubic-bezier(0.45, 0, 0.55, 1),
      background 0.3s cubic-bezier(0.45, 0, 0.55, 1),
      outline-color 0.4s cubic-bezier(0.45, 0, 0.55, 1);
    &:hover {
      color: $ext-btn-bg;
    }
  }
}

.router-link-active {
  color: $ext-btn-bg;
  font-weight: bold;
}
</style>
