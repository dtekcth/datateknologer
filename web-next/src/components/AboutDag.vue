<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useLocale } from "@/composables/useLocale";
import RevealTitle from "@/components/RevealTitle.vue";
import EventWave from "@/components/EventWave.vue";
/* board members live in src/content/board.ts — edit them there */
import { BOARD } from "@/content/board";

const { lang } = useLocale();

const copy = computed(() =>
  lang.value === "sv"
    ? {
        title: "Om DAG",
        lead: "DAG är Datas arbetsmarknadsgrupp på Chalmers — vi kopplar ihop studenter med näringslivet genom lunchföreläsningar, casekvällar och studiebesök under hela läsåret.",
      }
    : {
        title: "About DAG",
        lead: "DAG is the career committee of the CSE student division at Chalmers — connecting students with industry through lunch lectures, case evenings and study visits all year round.",
      },
);

/* members rise in as the grid scrolls into view, and sink back out on
   the way up — same reversible pattern as the rest of the page */
const grid = ref<HTMLElement | null>(null);
const shown = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !grid.value) {
    shown.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      shown.value = entries[entries.length - 1].isIntersecting;
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );
  observer.observe(grid.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section id="om" class="about">
    <RevealTitle class="about-title" :text="copy.title" />
    <p class="lead">{{ copy.lead }}</p>

    <div class="board-stage" :class="{ shown }">
      <EventWave class="about-wave" />

      <div ref="grid" class="board" :class="{ shown }">
        <figure
          v-for="(m, i) in BOARD"
          :key="m.role.en"
          class="member"
          :style="{ '--i': i }"
        >
          <div class="photo">
            <img
              :src="m.photo"
              :alt="`${m.name} — ${m.role[lang]}`"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span class="role">{{ m.role[lang] }}</span>
            <p class="name">{{ m.name }}</p>
            <a class="email" :href="`mailto:${m.email}`">{{ m.email }}</a>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  max-width: 1120px;
  margin: 0 auto;
  padding: 110px 24px 140px;
  /* the wave backdrop is wider than the photo row; clip so it can't
     push a horizontal scrollbar on narrow viewports */
  overflow: clip;
}

.about-title {
  margin: 0 0 26px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--orange);
  text-wrap: balance;
}

.lead {
  margin: 0 auto 64px;
  max-width: 58ch;
  text-align: center;
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: 0.02em;
  color: var(--ink);
  text-wrap: balance;
}

/* the wave is a backdrop the opaque photos sit on top of — it reads in
   the gaps between them and around the row, like the tree/clock behind
   the event cards */
.board-stage {
  position: relative;
}

.about-wave {
  position: absolute;
  left: 50%;
  top: 42%; /* centred on the photo band, above the captions */
  transform: translate(-50%, -50%);
  /* wider than the photo row (~1032px) so it clearly extends past the
     outer photos and overhangs top/bottom — the opaque photos then
     sit over its centre */
  width: min(118%, 1280px);
  max-width: none;
  margin: 0;
  z-index: 0;
  opacity: 0.3;
  /* wipes in left→right, in step with the photos' staggered reveal */
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1100ms var(--ease-out);
}

.board-stage.shown .about-wave {
  clip-path: inset(0 0 0 0);
}

/* ============ Board grid ============ */
.board {
  position: relative;
  z-index: 1; /* photos over the wave */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 240px));
  justify-content: center;
  gap: 32px 24px;
}

.member {
  margin: 0;
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 600ms var(--ease-out) calc(var(--i) * 110ms),
    transform 700ms var(--ease-out-expo) calc(var(--i) * 110ms);
}

.board.shown .member {
  opacity: 1;
  transform: translateY(0);
}

.photo {
  border: 2px solid var(--ink);
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: var(--paper);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* fold the photos into the paper palette; colour returns on hover */
  filter: grayscale(1) contrast(1.06);
  transition: filter 260ms var(--ease-out);
}

.member:hover .photo img {
  filter: none;
}

figcaption {
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.role {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--orange);
}

.name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.email {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.03em;
  color: var(--muted);
  text-decoration: none;
  width: fit-content;
  border-bottom: 1px solid
    color-mix(in srgb, var(--muted) 45%, transparent);
}

.email:hover {
  color: var(--orange);
  border-bottom-color: var(--orange);
}

@media (prefers-reduced-motion: reduce) {
  .member {
    transition: none;
    opacity: 1;
    transform: none;
  }

  .about-wave {
    transition: none;
    clip-path: none;
  }
}

@media (max-width: 640px) {
  .about {
    padding: 72px 20px 96px;
  }

  .lead {
    margin-bottom: 44px;
  }

  .board {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 24px 16px;
  }

  .name {
    font-size: 17px;
  }

  .email {
    font-size: 11px;
    word-break: break-all;
  }
}
</style>
