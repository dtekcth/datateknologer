<script setup lang="ts">
import { onMounted } from "vue";
import IntroLoader from "@/components/IntroLoader.vue";
import TransitionVeil from "@/components/TransitionVeil.vue";
import { introPhase } from "@/composables/useIntro";
import { mode, phase } from "@/composables/usePageTransition";
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
  <!-- the zoom only plays in dolly mode (leaving the landing page);
       fade-mode swaps leave the page geometry alone -->
  <div
    class="page"
    :class="{
      'dolly-in': phase === 'cover' && mode === 'dolly',
      settle: phase === 'reveal' && mode === 'dolly',
    }"
  >
    <RouterView v-if="introPhase !== 'hold'" />
  </div>
  <TransitionVeil />
</template>

<style scoped>
/* camera dollies forward into the scene — the whole page (clouds, text)
   rushes past the viewer while the veil whites out the peak */
.page.dolly-in {
  transform: scale(2.6);
  transform-origin: 50% 42%;
  transition: transform 760ms cubic-bezier(0.55, 0, 1, 0.45);
  will-change: transform;
}

/* the new page settles as the camera exits the cloud */
.page.settle {
  animation: settle 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes settle {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
}
</style>
