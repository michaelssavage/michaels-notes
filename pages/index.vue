<script setup lang="ts">
useHead({
  title: "Michael Savage",
});
</script>

<template>
  <main class="container">
    <h1>Hey, <span>I am Michael!</span></h1>
    <p>
      I'm a Software Developer from Ireland that enjoys React.js, Typescript,
      Python, and Spring Boot. My world revolves around
      <span class="underline">
        electronic music, movies, rugby, and travelling </span
      >.
    </p>
    <div class="icons">
      <Icon external link="https://github.com/michaelssavage">
        <IconsGithub />
      </Icon>
      <Icon external link="https://www.linkedin.com/in/michaelssavage">
        <IconsLinkedin />
      </Icon>
      <Icon external link="mailto:michaelsavage940@gmail.com">
        <IconsMail />
      </Icon>
      <Icon
        external
        link="https://open.spotify.com/user/1156402021?si=e72693546a9240ac"
      >
        <IconsSpotify />
      </Icon>
    </div>
    <div class="homeLine" />
  </main>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
  h1 {
    font-size: 4rem;
    text-align: center;
    margin: 0 1rem;
    span {
      color: $header;
    }
  }
  p {
    font-size: 1.2rem;
    margin: 1rem 25%;
    text-align: center;
  }
  @include for-tablet-only {
    h1 {
      font-size: 3rem;
    }
    p {
      margin: 1rem 15%;
    }
  }
  @include for-phone-only {
    h1 {
      font-size: 2rem;
    }
    p {
      margin: 1rem 10%;
    }
  }
}

.icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin: 0 1rem;
  svg {
    width: 5rem;
    height: 5rem;
  }
}

.homeLine {
  margin-top: -2rem;
  border-bottom: 2rem solid $mint;
  width: 75%;
  z-index: -1;
  margin-left: auto;
  @include slide-in-animation(100px);
}
</style>
