<script setup lang="ts">
import imageUrl from "/images/cover.jpg";

useHead({
  title: "About Me",
});
</script>

<template>
  <main>
    <div class="container">
      <div class="paragraph">
        <p>
          Born in Ireland and currently based in
          <span class="underline">Barcelona, Spain.</span>
        </p>
        <p>
          I studied Computer Applications in DCU and started working with Jaguar
          Land Rover, Shannon in 2021 where I learned to work with REST APIs
          using Spring Boot and React.js early on.
        </p>
        <p>
          I'm passionate about films, and I love sharing and keeping track of
          them on Letterboxd (the best social media platform).
        </p>
        <p>
          I've played sports all my life including Gaelic Football for
          Clontibret O'Neills GFC and rugby for teams like Ulster Club u18s,
          Monaghan RFC, Ennis RFC, and Corinthians RFC. More recently I've
          joined Barcelona Gaels and a local running club!
        </p>
        <p>
          I co-created Plant Bass'd, an electronic music blog and underground
          club night. Music is definitely a large part of my identity and I love
          trying to make music in Ableton too!
          <PrettyLink
            text="What is Plant Bass'd?"
            link="/blog/what-is-plant-bassd"
          />
        </p>
      </div>
      <div class="image">
        <NuxtImg
          :src="imageUrl"
          alt="Picture of Me"
          :placeholder="[100, 100, 10]"
        />
        <div class="square" />
      </div>
    </div>
    <div class="horizon" />
    <div class="spotify">
      <NowSpotify />
      <TopSpotify />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 2rem;
  gap: 2rem;

  .paragraph {
    font-size: 1.2rem;
    margin-left: 15%;
    p {
      margin-bottom: 1rem;
    }
  }

  .image {
    margin-right: 20%;
    position: relative;
    img {
      margin-left: 2rem;
      margin-top: 3rem;
      width: 700px;
      height: auto;
    }

    .square {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 25vh;
      width: 15vw;
      background-color: var(--square);
    }
  }

  @include for-phone-only {
    flex-direction: column;
    margin-left: 5%;
    .paragraph {
      margin: auto 0;
      p {
        margin-right: 5%;
      }
    }
    .image {
      margin: -2rem 5% 2rem 0;
      img {
        width: 240px;
        min-width: 140px;
        padding-right: 2.5rem;
      }
      .square {
        height: 30vh;
        width: 60vw;
      }
    }
  }
}

.horizon {
  margin-top: -2rem;
  border-bottom: 1rem solid $mint;
  width: 80%;
  z-index: -1;
  margin-right: auto;
  @include slide-in-animation(200px, $direction: "horizontal", $duration: 0.5s);
}
.spotify {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 60%;
  margin: 2rem 2rem;
  margin-left: 15%;
  @include for-phone-only {
    width: 95%;
    margin: 2rem 5%;
    gap: 1rem;
  }
}
</style>
