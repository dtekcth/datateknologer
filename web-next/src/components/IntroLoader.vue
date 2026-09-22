<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { introPhase } from "@/composables/useIntro";
import logoUrl from "@/assets/logo-full-dark.svg";

const logoEl = ref<HTMLImageElement | null>(null);
const fading = ref(false);

const MORPH_MS = 900;
/* hero nav fade-in (700ms) + margin: the nav logo fades in directly
   underneath the overlaid one, so removing the overlay is invisible */
const SETTLE_MS = 750;

watch(introPhase, async (phase) => {
  if (phase === "morph") {
    await nextTick(); // let the app mount so the nav logo can be measured

    const logo = logoEl.value;
    const target = document.querySelector<HTMLElement>("[data-hero-logo]");

    if (!logo || !target) {
      // deep link that isn't the hero — no nav logo to fly to, just fade out
      fading.value = true;
      setTimeout(() => {
        introPhase.value = "done";
      }, 550);
      return;
    }

    // FLIP: measure both positions, then transform from one to the other.
    // The entrance animation must be cleared first or its fill would
    // override the inline transform.
    logo.style.animation = "none";
    const from = logo.getBoundingClientRect();
    const to = target.getBoundingClientRect();

    if (!from.width || !to.width) {
      // degenerate measurement (image not sized yet) — fade out instead
      // of flying to a garbage position
      fading.value = true;
      setTimeout(() => {
        introPhase.value = "done";
      }, 550);
      return;
    }

    logo.style.transformOrigin = "top left";
    /* explicit start value so every browser transitions from the same
       state instead of an implicit "none" (Safari is picky here) */
    logo.style.transform = "translate(0px, 0px) scale(1)";
    logo.style.transition = `transform ${MORPH_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    void logo.offsetWidth; // commit the transition before moving
    logo.style.transform = `translate(${to.left - from.left}px, ${
      to.top - from.top
    }px) scale(${to.width / from.width})`;

    setTimeout(() => {
      introPhase.value = "enter";
    }, MORPH_MS);
  }

  if (phase === "enter") {
    setTimeout(() => {
      introPhase.value = "done";
    }, SETTLE_MS);
  }
});
</script>

<template>
  <div
    class="intro"
    :class="{ leaving: introPhase !== 'hold', fading }"
    aria-hidden="true"
  >
    <img ref="logoEl" class="intro-logo" :src="logoUrl" alt="" />
    <p class="intro-name">Datateknologsektionens arbetsmarknadsgrupp</p>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
}

/* once the logo starts flying, the overlay stops being a wall:
   background goes (hero underneath shares the same paper) and
   clicks pass through */
.intro.leaving {
  background: transparent;
  pointer-events: none;
}

.intro.fading {
  opacity: 0;
  transition: opacity 550ms var(--ease-out-expo);
}

/* same size as the hero nav logo, so the handoff is a pure glide */
.intro-logo {
  height: 58px;
  width: auto;
  animation: rise-in 900ms var(--ease-out-expo) both;
}

.intro-name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink);
  animation: rise-in 900ms var(--ease-out-expo) 180ms both;
  transition: opacity 250ms ease-out;
}

/* its fill-mode animation would pin opacity at 1, so clear it
   before transitioning out */
.intro.leaving .intro-name {
  animation: none;
  opacity: 0;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .intro-logo {
    height: 42px;
  }

  .intro-name {
    font-size: 10px;
    max-width: 32ch;
  }
}
</style>
