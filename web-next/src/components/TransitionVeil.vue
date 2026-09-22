<script setup lang="ts">
import { mode, phase } from "@/composables/usePageTransition";
</script>

<!-- Paper whiteout that masks the page swap. In dolly mode it ramps in
     late so the camera fly-forward stays visible, then fades off the
     incoming page. In fade mode it's a plain quick crossfade — no zoom
     (student ↔ company swaps). -->
<template>
  <div class="veil" :class="[phase, mode]" aria-hidden="true" />
</template>

<style scoped>
.veil {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background: var(--paper);
  opacity: 0;
  visibility: hidden;
}

.veil.cover,
.veil.reveal {
  visibility: visible;
}

.veil.cover.dolly {
  animation: whiteout-in 760ms cubic-bezier(0.55, 0, 1, 0.45) both;
}

.veil.reveal.dolly {
  animation: whiteout-out 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* plain crossfade for ordinary page swaps */
.veil.cover.fade {
  animation: veil-fade-in 300ms ease-out both;
}

.veil.reveal.fade {
  animation: whiteout-out 360ms ease both;
}

@keyframes whiteout-in {
  0% {
    opacity: 0;
  }
  55% {
    opacity: 0.12;
  }
  100% {
    opacity: 1;
  }
}

@keyframes veil-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes whiteout-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
