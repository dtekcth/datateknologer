<script setup lang="ts">
import { onMounted } from "vue";
import IntroLoader from "@/components/IntroLoader.vue";
import TransitionVeil from "@/components/TransitionVeil.vue";
import { introPhase } from "@/composables/useIntro";
import { useAnchorScroll } from "@/composables/useAnchorScroll";

const HOLD_MS = 1300;

/* fast-start, slow-landing scroll for all in-page anchor links */
useAnchorScroll();

onMounted(() => {
  /* utility pages (tickets, admin) skip the intro — someone scanning a
     QR at a door shouldn't wait for the logo animation */
  const utility = /\/(ticket|admin)(\/|$)/.test(window.location.pathname);
  if (
    utility ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    introPhase.value = "done";
    return;
  }

  setTimeout(() => {
    introPhase.value = "morph";
  }, HOLD_MS);
});
</script>

<template>
  <IntroLoader v-if="introPhase !== 'done'" />
  <div class="page">
    <RouterView v-if="introPhase !== 'hold'" />
  </div>
  <TransitionVeil />
</template>

<style scoped>
.page {
  min-height: 100vh;
}
</style>
