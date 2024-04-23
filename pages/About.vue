<script setup lang="ts">
import imageUrl from '/images/cover.jpg';

useHead({
	title: 'About Me',
});
</script>

<template>
	<main class="container">
		<div class="paragraph">
			<p>Born in Ireland and currently based in Barcelona.</p>
			<p>
				I studied Computer Applications in DCU and got my first software
				development job with JLR, Shannon in 2021. Played sports all my life
				including Gaelic Football and rugby for teams like Ulster Club u18s,
				Monaghan RFC, Ennis RFC, Corinthians RFC, and Barcelona Gaels.
			</p>
			<p>
				Co-created Plant Bass'd, an electronic music blog and underground club
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
      height: 12rem;
      width: 12rem;
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
  }
}
</style>
