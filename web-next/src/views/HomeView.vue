<script setup lang="ts">
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";
import { introPhase } from "@/composables/useIntro";
import { mode, phase } from "@/composables/usePageTransition";
import logoUrl from "@/assets/logo-full-dark.svg";
import cloudUrl from "@/assets/cloud-dither.svg";
import birdsUrl from "@/assets/birds-dither.svg";

const { lang, otherLang } = useLocale();

/* entrance stays paused until the intro logo has flown into the nav */
const introWait = computed(
  () => introPhase.value === "hold" || introPhase.value === "morph",
);

const copy = computed(() =>
  lang.value === "sv"
    ? {
        eyebrow: "Datateknologsektionens arbetsmarknadsgrupp",
        headline: "Där data möter näringslivet.",
        lead: "Vi kopplar samman Chalmers Datateknik-studenter med Sveriges mest spännande arbetsgivare.",
        locationLabel: "Plats",
        locationLine1: "Chalmers tekniska högskola",
        locationLine2: "Göteborg",
        ctaStudent: "Jag är student",
        ctaCompany: "Jag är företag",
      }
    : {
        eyebrow: "The CSE student division's career committee",
        headline: "Where data meets industry.",
        lead: "We connect Chalmers computer science students with Sweden's most exciting employers.",
        locationLabel: "Location",
        locationLine1: "Chalmers University of Technology",
        locationLine2: "Gothenburg",
        ctaStudent: "I'm a student",
        ctaCompany: "I'm a company",
      },
);
</script>

<template>
  <div
    class="hero"
    :class="{
      'intro-wait': introWait,
      flying: phase === 'cover' && mode === 'dolly',
    }"
  >
    <header class="nav">
      <div />
      <img class="logo" data-hero-logo :src="logoUrl" alt="DAG" />
      <div class="nav-right">
        <RouterLink class="lang-toggle" :to="{ params: { lang: otherLang } }">
          {{ otherLang.toUpperCase() }}
        </RouterLink>
      </div>
    </header>

    <div class="meta">
      <div class="location">
        <span class="location-label">{{ copy.locationLabel }}</span>
        <p>{{ copy.locationLine1 }}<br />{{ copy.locationLine2 }}</p>
      </div>
    </div>

    <main class="stage">
      <img class="cloud cloud-left" :src="cloudUrl" alt="" />
      <img class="cloud cloud-right" :src="cloudUrl" alt="" />
      <img class="birds" :src="birdsUrl" alt="" />

      <div class="content">
        <span class="eyebrow">{{ copy.eyebrow }}</span>
        <h1 class="headline">{{ copy.headline }}</h1>
        <p class="lead">{{ copy.lead }}</p>

        <div class="ctas">
          <RouterLink
            class="cta cta-student"
            :to="{ name: 'student', params: { lang } }"
          >
            {{ copy.ctaStudent }}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </RouterLink>

          <RouterLink
            class="cta cta-company"
            :to="{ name: 'company', params: { lang } }"
          >
            {{ copy.ctaCompany }}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ============ Nav ============ */
.nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 26px 48px;
  position: relative;
  z-index: 3;
  animation: fade-in 700ms var(--ease-out-expo) both;
}

.logo {
  height: 58px;
  width: auto;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.lang-toggle {
  text-decoration: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.lang-toggle:hover {
  color: var(--orange-bright);
}

/* ============ Corner meta ============ */
.meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  padding: 20px 48px 0;
  position: relative;
  z-index: 2;
  animation: fade-in 700ms var(--ease-out-expo) 150ms both;
}

.location {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--orange);
}

.location p {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.7;
  color: var(--muted);
}

/* ============ Stage ============ */
.stage {
  flex: 1;
  position: relative;
  display: grid;
  place-items: start center;
  min-height: 0;
}

.cloud {
  position: absolute;
  height: auto;
  pointer-events: none;
}

.cloud-left {
  left: -72px;
  top: -48px;
  width: min(48vw, 620px);
  max-height: 48vh;
  opacity: 0.32;
  animation: cloud-in-left 1800ms var(--ease-out-expo) 200ms both;
}

.cloud-right {
  right: -64px;
  top: -24px;
  width: min(50vw, 650px);
  max-height: 50vh;
  opacity: 0.44;
  animation: cloud-in-right 1800ms var(--ease-out-expo) 300ms both;
}

.birds {
  position: absolute;
  left: 7vw;
  bottom: 5vh;
  width: 130px;
  height: auto;
  pointer-events: none;
  opacity: 0.9;
  animation: birds-in 1300ms var(--ease-out-expo) 800ms both;
}

/* ============ Content ============ */
.content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 24px 4px;
}

.eyebrow {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 14px;
  animation: rise-in 900ms var(--ease-out-expo) 250ms both;
}

.headline {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(52px, 8vw, 140px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.96;
  max-width: 14ch;
  text-wrap: balance;
  color: var(--orange);
  animation: rise-in 1100ms var(--ease-out-expo) 350ms both;
}

.lead {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  letter-spacing: 0.02em;
  color: var(--ink);
  max-width: 52ch;
  text-wrap: balance;
  animation: rise-in 900ms var(--ease-out-expo) 500ms both;
}

/* the container is animated (not .cta) so the entrance transform
   doesn't override the hover/active transforms on the links */
.ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
  flex-wrap: wrap;
  animation: rise-in 900ms var(--ease-out-expo) 650ms both;
}

.cta {
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 14px 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  position: relative;
  transition:
    color 160ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.cta:active {
  transform: translateY(1px);
}

.cta-student {
  color: var(--orange);
}

.cta-student:hover {
  color: var(--orange-deep);
  transform: translateY(-2px);
}

.cta-company {
  color: var(--ink-soft);
}

.cta-company:hover {
  color: var(--orange);
  transform: translateY(-2px);
}

/* ============ Fly-forward (page transition) ============ */
/* on top of the whole-page dolly in App.vue, the clouds get extra
   forward motion so they peel past the camera with parallax depth */
.hero.flying .cloud-left {
  animation: cloud-fly-left 760ms cubic-bezier(0.55, 0, 1, 0.45) both;
}

.hero.flying .cloud-right {
  animation: cloud-fly-right 760ms cubic-bezier(0.55, 0, 1, 0.45) both;
}

@keyframes cloud-fly-left {
  from {
    opacity: 0.32;
    transform: none;
  }
  to {
    opacity: 0.55;
    transform: translate(-28vw, -14vh) scale(2);
  }
}

@keyframes cloud-fly-right {
  from {
    opacity: 0.44;
    transform: none;
  }
  to {
    opacity: 0.65;
    transform: translate(26vw, -12vh) scale(2.2);
  }
}

/* ============ Entrance ============ */
/* everything (including animation delays) waits for the intro handoff */
.hero.intro-wait .nav,
.hero.intro-wait .meta,
.hero.intro-wait .eyebrow,
.hero.intro-wait .headline,
.hero.intro-wait .lead,
.hero.intro-wait .ctas,
.hero.intro-wait .cloud-left,
.hero.intro-wait .cloud-right,
.hero.intro-wait .birds {
  animation-play-state: paused;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cloud-in-left {
  from {
    opacity: 0;
    transform: translateX(-72px);
  }
  to {
    opacity: 0.32;
    transform: translateX(0);
  }
}

@keyframes cloud-in-right {
  from {
    opacity: 0;
    transform: translateX(72px);
  }
  to {
    opacity: 0.44;
    transform: translateX(0);
  }
}

@keyframes birds-in {
  from {
    opacity: 0;
    transform: translate(-20px, 8px);
  }
  to {
    opacity: 0.9;
    transform: translate(0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav,
  .meta,
  .eyebrow,
  .headline,
  .lead,
  .ctas,
  .cloud-left,
  .cloud-right,
  .birds {
    animation: none;
  }
}

/* ============ Mobile ============ */
@media (max-width: 640px) {
  .nav {
    padding: 16px 20px;
  }

  .logo {
    height: 42px;
  }

  .meta {
    padding: 8px 20px 0;
  }

  .location p {
    font-size: 11px;
  }

  .content {
    padding: 2vh 20px 8px;
    gap: 14px;
  }

  .eyebrow {
    font-size: 11px;
    letter-spacing: 0.14em;
    margin-bottom: 6px;
    max-width: 30ch;
  }

  .headline {
    font-size: clamp(42px, 13vw, 60px);
  }

  .lead {
    font-size: 14px;
    max-width: 34ch;
  }

  .ctas {
    flex-direction: column;
    gap: 4px;
    margin-top: 6px;
  }

  .cloud-left {
    width: 78vw;
    left: -18vw;
    top: -24px;
  }

  .cloud-right {
    width: 82vw;
    right: -22vw;
    top: auto;
    bottom: -4vh;
  }

  .birds {
    width: 84px;
  }
}
</style>
