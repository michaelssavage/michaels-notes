<script setup lang="ts">
import imageUrl from '/images/cover.jpg';

useHead({
	title: 'About Me',
});
</script>

<template>
	<main>
		<div class="container">
			<div class="paragraph">
				<p>Born in Ireland and currently based in Barcelona.</p>
				<p>
					Studied Computer Applications in DCU and started working with JLR, Shannon in 2021 where I learned to work with REST APIs using Spring Boot and React.js early on.
				</p>
				<p>
					I've played sports all my life including Gaelic Football for Clontibret O'Neills GFC and rugby for teams like Ulster Club u18s,
					Monaghan RFC, Ennis RFC, and Corinthians RFC. More recently I've joined Barcelona Gaels and a local running club!
				</p>
				<p>
					I co-created Plant Bass'd, an electronic music blog and underground club
					night.<PrettyLink
						text="What is Plant Bass'd?"
						link="/blog/what-is-plant-bassd"
					/>
				</p>
				<div class="horizon" />
			</div>
			<div class="image">
				<img
					:src="imageUrl"
					alt="Picture of Me"
				>
				<div class="square" />
			</div>
		</div>
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
    p {
      margin-left: 20%;
      margin-bottom: 1rem;
    }
    .horizon {
      margin-top: 2rem;
      border-bottom: 1rem solid var(--color-aqua);
      width: 90%;
      z-index: -1;
      margin-right: auto;
    }
  }

  .image {
    margin-right: 20%;
    position: relative;
    img {
      margin-left: 2rem;
      margin-top: 2rem;
      min-width: 100%;
      max-width: 100%;
      height: auto;
    }
    .square {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 30vh;
      width: 15vw;
      background-color: var(--color-orange);
    }
  }

  @include for-phone-only {
    flex-direction: column;
    .paragraph {
      p {
        margin-left: 5%;
        margin-right: 5%;
      }
    }
    .image {
      margin: 0 5%;
      img {
        max-width: 70%;
        min-width: 70%;
      }
      .square {
        height: 30vh;
        width: 60vw;
      }
    }
  }
}
.spotify {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 1rem;
  @include for-phone-only {
    margin: 2rem 0.5rem;
    gap: 1rem;
  }
}
</style>
